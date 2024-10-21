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
        contract_type,
        scope_attachment,
    } = req.body


    try {

        let recruiter = await Recruiter.findOne({ user: req.user.id });
        const updateFields = {};
        if (mobile_number) updateFields.mobile_number = mobile_number;
        if (country) updateFields.country = country;
        if (state) updateFields.state = state;
        if (organization) updateFields.organization = organization;
        if (work_preference) updateFields.work_preference = work_preference;
        if (contract_type) updateFields.contract_type = contract_type;
        if (scope_attachment) updateFields.scope_attachment = scope_attachment;

        console.log({updateFields})

        if (recruiter) {
            recruiter = await Recruiter.findOneAndUpdate(
                { user: req.user.id },
                { $set: updateFields }, 
                { new: true }
            )
            return res.json({
                status: true,
                data: recruiter,
                message: 'Recruiter profile updated successfully'
            })
        }

        recruiter = new Recruiter({
            user: req.user.id,
            ...updateFields,
        });

        await recruiter.save()
        res.json({
            status: true,
            message: 'Recruiter profile created successfully',
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