import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  resumeData: {
    personalInfo: {
      name: String,
      email: String,
      github: String,
      linkedin: String,
      codechef: String,
      codeforces: String
    },
    education: [{
      institution: String,
      years: String,
      degree: String,
      location: String
    }],
    experience: [{
      position: String,
      company: String,
      location: String,
      duration: String,
      responsibilities: [String]
    }],
    projects: [{
      name: String,
      technologies: String,
      description: [String]
    }],
    achievements: [String],
    skills: {
      languages: String,
      frameworks: String,
      tools: String
    }
  },
  pdfFilename: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Resume', resumeSchema);
