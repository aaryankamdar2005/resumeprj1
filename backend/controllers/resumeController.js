import { generateResumeContent } from "../utils/geminiService.js";
import { generateHTMLResume } from "../templates/resumeHTML.js";
import { generatePDFFromHTML } from "../utils/htmlToPdf.js";
import Resume from "../models/Resume.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumesDir = path.join(__dirname, "../resumes");
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}

export const generateResume = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user?.id; // Optional - from auth middleware if logged in

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    console.log("Received prompt:", prompt);

    // Step 1: Generate structured content
    console.log("Generating resume content with Gemini...");
    const resumeData = await generateResumeContent(prompt);
    console.log("Resume data generated");

    // Step 2: Create HTML
    console.log("Generating HTML document...");
    const htmlContent = generateHTMLResume(resumeData);

    // Step 3: Generate PDF
    const timestamp = Date.now();
    const filename = userId 
      ? `resume_${userId}_${timestamp}.pdf` 
      : `resume_${timestamp}.pdf`;
    const outputPath = path.join(resumesDir, filename);

    console.log("Compiling PDF...");
    await generatePDFFromHTML(htmlContent, outputPath);

    // Step 4: Save to database (only if user is logged in)
    let savedResume = null;
    if (userId) {
      savedResume = await Resume.create({
        userId,
        prompt,
        resumeData,
        pdfFilename: filename
      });
      console.log("✅ Resume saved to database");
    }

    // Step 5: Return response
    res.json({
      success: true,
      message: "Resume generated successfully",
      data: {
        ...(savedResume && { resumeId: savedResume._id }),
        resumeData: resumeData,
        pdfUrl: `/api/resume/download/${filename}`,
        downloadUrl: `http://localhost:8000/api/resume/download/${filename}`,
        ...(savedResume && { createdAt: savedResume.createdAt }),
        saved: !!userId // Indicates if resume was saved to DB
      },
    });
  } catch (error) {
    console.error("Error generating resume:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all resumes for logged-in user
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }

    const resumes = await Resume.find({ userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get specific resume by ID
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const resume = await Resume.findOne({ _id: id, userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: "Resume not found",
      });
    }

    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const resume = await Resume.findOne({ _id: id, userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: "Resume not found",
      });
    }

    // Delete PDF file
    const filePath = path.join(resumesDir, resume.pdfFilename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await Resume.deleteOne({ _id: id });

    res.json({
      success: true,
      message: "Resume deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
