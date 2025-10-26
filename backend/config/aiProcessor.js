import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const processResume = async (resumeText, jobDescription) => {
  const prompt = `
You are a very skillful resume evaluator.

Extract the following details from the resume:
- Name
- Contact Info
- Skills
- Experience
- Education
- Certifications
- Summary

Resume Content:
${resumeText}

Match this resume with the job description below and provide:
- A match score (0-100)
- Constructive feedback
The job description should be short and crisp.

Job Description:
${jobDescription}
`;

  try {
    console.log("Sending request to Gemini...");
    console.log(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

 
    return text;
  } catch (error) {
    console.error("Error processing resume with Gemini:", error);
    throw new Error("Failed to process resume with AI.");
  }
};
