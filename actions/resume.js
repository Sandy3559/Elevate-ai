"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro",
});

export async function saveResume(content) {
  const { user: authUser } = await auth();
  if (!authUser) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      firebaseUid: authUser.firebaseUid,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error.message);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { user: authUser } = await auth();
  if (!authUser) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { firebaseUid: authUser.firebaseUid },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { user: authUser } = await auth();
  if (!authUser) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { firebaseUid: authUser.firebaseUid },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompts = {
    summary: `
      As an expert resume writer, improve the following professional summary for a ${user.industry} professional.
      Make it more impactful, concise, and aligned with industry best practices.
      Current summary: "${current}"

      Requirements:
      1. Start with a powerful opening statement.
      2. Highlight key achievements and quantify results where possible.
      3. Incorporate relevant keywords for the ${user.industry} industry.
      4. Keep it between 3-5 sentences.
      5. Maintain a professional and confident tone.

      Format the response as a single paragraph without any additional text or explanations.
    `,
    skills: `
      As an expert resume writer, enhance the following skills section for a ${user.industry} professional.
      Organize the skills into relevant categories and suggest additional, high-demand skills if applicable.
      Current skills: "${current}"

      Requirements:
      1. Group skills into logical categories (e.g., Programming Languages, Tools, Methodologies).
      2. Ensure the skills are formatted clearly, preferably as a comma-separated list within each category.
      3. Add 2-3 relevant, in-demand skills for the ${user.industry} industry that might be missing.
      4. Do not add any introductory or concluding text, only the categorized skills.

      Format the response as a list of categories with comma-separated skills.
    `,
    default: `
      As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
      Make it more impactful, quantifiable, and aligned with industry standards.
      Current content: "${current}"

      Requirements:
      1. Use action verbs
      2. Include metrics and results where possible
      3. Highlight relevant technical skills
      4. Keep it concise but detailed
      5. Focus on achievements over responsibilities
      6. Use industry-specific keywords
      
      Format the response as a single paragraph without any additional text or explanations.
    `,
  };

  const prompt = prompts[type] || prompts.default;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}
