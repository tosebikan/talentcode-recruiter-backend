import express from "express";
const router = express.Router();

import {
  job_industries,
  job_categories,
  job_experience,
  job_level,
  job_types,
  job_preference,
  job_skills,
} from "../constants/industryDataConstants.js";

router.get("/industry-data", (req, res) => {
    try{
        res.json({ job_industries, job_categories, job_experience, job_level, job_types, job_preference, job_skills });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
 
});

export default router
