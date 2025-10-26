import express from 'express';
import { 
  generateResume, 
  getUserResumes, 
  getResumeById, 
  deleteResume 
} from '../controllers/resumeController.js';
import  isAuth  from '../middlewares/isAuth.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate resume - works for both logged in and guest users
// If logged in, saves to DB. If guest, just generates PDF
router.post('/generate', isAuth , generateResume);

// Protected routes - only for logged-in users
router.get('/my-resumes', isAuth , getUserResumes);
router.get('/:id', isAuth , getResumeById);
router.delete('/:id', isAuth , deleteResume);

// Public download route
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../resumes', filename);
  res.download(filePath);
});

export default router;
