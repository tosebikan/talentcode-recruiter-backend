import express from 'express';
import {  } from '../config/multerConfig.js';
import {
    profilePictureUpload, resumeUpload
  } from "../config/multerConfig.js";
const router = express.Router();

// Upload route for resumes and profile pictures
router.post('/upload', resumeUpload.single('resume'), profilePictureUpload.single('profilePicture'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const resumeUrl = req.file.path; // URL of the uploaded resume
    const profilePictureUrl = req.file.path; // URL of the uploaded profile picture
  
    res.status(200).json({ resumeUrl, profilePictureUrl });
  });
  
export default router;