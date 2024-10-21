import  multer  from 'multer'
import cloudinary from './cloudinary.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure storage with Cloudinary for resumes
const resumeStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'resumes', // The folder name for resumes
      allowed_formats: ['pdf', 'doc', 'docx'], // Allowed file formats for resumes
    },
  });

// Configure storage with Cloudinary for profile pictures
const profilePictureStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'profile_pictures', // The folder name for profile pictures
      allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats for profile pictures
    },
  });
  
// Create multer instances
export const resumeUpload = multer({ storage: resumeStorage });
export const profilePictureUpload = multer({ storage: profilePictureStorage });

