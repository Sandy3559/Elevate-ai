"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro",
});

export const generateAIInsights = async (industry) => {
    const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
    const {user : authUser} = await auth();
        if(!authUser) return null;
    
        const user = await db.user.findUnique({
            where: {
                firebaseUid: authUser.firebaseUid,
            },
            include: {
                industryInsight: true,
            },
        });
    
        if (!user) return null;

        if(!user.industryInsight){
            const insights = await generateAIInsights(user.industry);

            const industryInsight = await db.industryInsight.create({
                data: {
                    industry: user.industry,
                    ...insights,
                    nextUpdate: new Date(Date.now () + 7 * 24 * 60 * 60 * 1000),
                },
            });

            return industryInsight;
        }

        return user.industryInsight;
}