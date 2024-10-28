import mongoose from 'mongoose';

const talentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skills: [String],
    experience: String,
    location: String,
    portfolio: String,
    createdAt:{
        type: Date,
        default: Date.now
    },
    mobile_number: String,
    country: String,
    state: String,
    dob: Date,
    job_category: String,
    about: String,
    job_experience_id: Number,
    linkedin_link: String,
    portfolio_link: String,
    hourly_rate: Number,
    work_preference: [String],
    job_industries: [String],
    job_career_level_id: Number,
    onboarding_step: Number,
    onboarding_complete: Boolean,
    resume: String,
    profile_picture: String
})

const Talent = mongoose.model('Talent', talentSchema);

export default Talent;
