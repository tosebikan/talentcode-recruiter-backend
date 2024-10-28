import express from 'express';
import auth from '../middleware/auth.js';
import Recruiter from '../models/Recruiter.js'


const router = express.Router();

// create or update recruiter profile
router.post('/update-recruiter', auth, async (req, res) => {
    const {
        mobile_number,
        country,
        state,
        organization,
        work_preference,
        contract_types,
        scope_attachment,
        onboarding_complete,
        organization_id,
        scope
    } = req.body


    try {

        let recruiter = await Recruiter.findOne({ user: req.user.id });
        const updateFields = {};
        if (mobile_number) updateFields.mobile_number = mobile_number;
        if (country) updateFields.country = country;
        if (state) updateFields.state = state;
        if (organization) updateFields.organization = organization;
        if (work_preference) updateFields.work_preference = work_preference;
        if (contract_types) updateFields.contract_types = contract_types;
        if (scope_attachment) updateFields.scope_attachment = scope_attachment;
        if (scope) updateFields.scope = scope;
        if (onboarding_complete) updateFields.onboarding_complete = onboarding_complete;
        if (organization_id) updateFields.organization_id = organization_id;

        if (recruiter) {
            recruiter = await Recruiter.findOneAndUpdate(
                { user: req.user.id },
                { $set: updateFields }, 
                { new: true }
            )
            return res.json({
                status: true,
                data: recruiter,
                message: 'Profile updated successfully'
            })
        }

        recruiter = new Recruiter({
            user: req.user.id,
            ...updateFields,
        });

        await recruiter.save()
        res.json({
            status: true,
            message: 'Profile created successfully',
            data: recruiter
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// get all talent
router.get('/get-recruiter', async (req, res) => {
    try {
        const recruiters = await Recruiter.find().populate('user', ['name', 'email']);
        res.json({
            status: true,
            messaged: 'Recruiters fetched successfully',
            data: recruiters
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

export default router;