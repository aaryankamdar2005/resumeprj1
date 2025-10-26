import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function generateResumeContent(userPrompt) {
  try {
    console.log("Generating resume content with Gemini...");
console.log(process.env.GEMINI_API_KEY);
    // Use the correct, active Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // ✅ confirmed working as of Oct 2025
    });

    const enhancedPrompt = `
You are a professional resume writer. Generate a resume in STRICT JSON format based on the information provided.

User Information: ${userPrompt}

Return ONLY a valid JSON object (no markdown, no code blocks, no explanations) with this EXACT structure:

{
  "personalInfo": {
    "name": "Full Name",
    "email": "email@example.com",
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  },
  "education": [
    {
      "institution": "College/University Name",
      "years": "Start Year - End Year",
      "degree": "Degree Program",
      "location": "City, Country"
    }
  ],
  "experience": [
    {
      "position": "Job Title",
      "company": "Company Name",
      "location": "Location/Remote",
      "duration": "Month Year - Month Year",
      "responsibilities": [
        "Achievement with metrics and impact",
        "Technical contribution with quantifiable results",
        "Process improvement or system enhancement"
      ]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "technologies": "Tech1, Tech2, Tech3",
      "description": [
        "What you built and the problem it solved",
        "Technical implementation details and impact"
      ]
    }
  ],
  "achievements": [
    "Notable achievement with context and impact"
  ],
  "skills": {
    "languages": "Language1, Language2, Language3",
    "frameworks": "Framework1, Framework2, Framework3",
    "tools": "Tool1, Tool2, Tool3"
  }
}

CRITICAL RULES:
1. ALL URLs must be realistic and under 80 characters
2. NO markdown or code fences
3. Each bullet point: concise with action verbs and metrics
4. Return ONLY the JSON (no explanations)

Generate the resume now:
`;

    // Generate content
    const result = await model.generateContent(enhancedPrompt);
    const responseText = result.response.text();

    console.log("Gemini API Response received.");

    // Extract only JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON found in Gemini response.");

    const jsonText = jsonMatch[0];
    const parsedData = JSON.parse(jsonText);

    // Sanitize long URLs
    if (parsedData.personalInfo) {
      const info = parsedData.personalInfo;
      for (const key of ["linkedin", "github"]) {
        if (info[key] && info[key].length > 100) {
          info[key] = info[key].split("/").slice(0, 4).join("/") || `https://${key}.com/user`;
        }
      }
    }

    return parsedData;

  } catch (error) {
    console.error("Error generating resume content:", error);
    throw new Error(`Gemini API Error: ${error.message}`);
  }
}
