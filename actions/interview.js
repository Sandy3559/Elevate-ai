"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function generateQuiz() {
  const { user: authUser } = await auth();
  if (!authUser) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      firebaseUid: authUser.firebaseUid,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
      user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
    }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    // Check if the cleaned text is a valid JSON
    try {
      const quiz = JSON.parse(cleanedText);
      if (quiz && quiz.questions) {
        return quiz.questions;
      } else {
        throw new Error("Invalid quiz structure in AI response");
      }
    } catch (parseError) {
      console.error("Error parsing quiz JSON: ", parseError);
      console.error("Original AI response text: ", text);
      throw new Error("Failed to parse quiz questions from AI response.");
    }
  } catch (error) {
    console.error("Error generating quiz: ", error);
    throw new Error("Failed to generate quiz questions. " + error.message);
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { user: authUser } = await auth();
  if (!authUser) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      firebaseUid: authUser.firebaseUid,
    },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const result = await model.generateContent(improvementPrompt);
      const response = result.response;
      improvementTip = response.text().trim();
    } catch (error) {
      console.error("Error generating improvement tip:", error);
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result" + error.message);
  }
}

export async function getAssessments() {
  const { user: authUser } = await auth();
  if (!authUser) return [];

  const user = await db.user.findUnique({
    where: {
      firebaseUid: authUser.firebaseUid,
    },
  });

  if (!user) return [];

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments: ", error);
    return [];
  }
}