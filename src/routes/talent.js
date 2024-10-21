import express from 'express';
import auth from '../middleware/auth.js';
import Talent from '../models/Talent.js'
import mongoose from 'mongoose';
import User from '../models/User.js';
import { resumeUpload, profilePictureUpload } from '../config/multerConfig.js'; 


const router = express.Router();

// create or update talent profile
router.post('/', auth, async (req, res) => {
    console.log('update', req)
    const { skills, experience, location, portfolio, mobile_number, country, state, dob, job_category,
        about,
        job_experience_id,
        linkedin_link,
        portfolio_link,
        hourly_rate,
        work_preference,
        job_industries,
        job_career_level_id,
        onboarding_step,
        resume,
        profile_picture,
    } = req.body;
    try {

        let talent = await Talent.findOne({ user: req.user.id });
        const user = await User.findById(req.user.id);

        const updateFields = {};
        if (skills) updateFields.skills = skills;
        if (experience) updateFields.experience = experience;
        if (location) updateFields.location = location;
        if (portfolio) updateFields.portfolio = portfolio;
        if (mobile_number) updateFields.mobile_number = mobile_number;
        if (country) updateFields.country = country;
        if (state) updateFields.state = state;
        if (dob) updateFields.dob = dob;
        if (job_category) updateFields.job_category = job_category
        if (about) updateFields.about = about
        if (job_experience_id) updateFields.job_experience_id = job_experience_id
        if (linkedin_link) updateFields.linkedin_link = linkedin_link
        if (portfolio_link) updateFields.portfolio_link = portfolio_link
        if (hourly_rate) updateFields.hourly_rate = hourly_rate
        if (work_preference) updateFields.work_preference = work_preference
        if (job_industries) updateFields.job_industries = job_industries
        if (job_career_level_id) updateFields.job_career_level_id = job_career_level_id
        if (onboarding_step) updateFields.onboarding_step = onboarding_step
        if (resume) updateFields.resume = resume
        if (profile_picture) updateFields.profile_picture = profile_picture


        console.log({talent})
        console.log({user})
        console.log({updateFields})

        if (talent) {
            talent = await Talent.findOneAndUpdate(
                { user: req.user.id },
                { $set: updateFields }, 
                { new: true }
            )
            return res.json({
                status: true,
                data: talent,
                message: 'Talent profile updated successfully'
            })
        }

        talent = new Talent({
            user: req.user.id,
            ...updateFields,
        });

        await talent.save()
        res.json({
            status: true,
            message: 'Talent profile created successfully',
            data: talent
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// get talent
router.get('/:id', async (req, res) => {
    try {
       const { id } = req.params;
       const objectId = new mongoose.Types.ObjectId(id);
       const talent = await Talent.findOne({ user: objectId });

       console.log({talent})

        res.json({
            status: true,
            messaged: 'Talent fetched successfully',
            data: talent
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// get all talents 
router.get('/', async (req, res) => {
    try {
        const talents = await Talent.find().populate('user', ['name', 'email']);
        res.json({
            status: true,
            messaged: 'Talents fetched successfully',
            data: talents
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

export default router;