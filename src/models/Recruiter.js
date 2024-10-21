import mongoose from 'mongoose';

const recruiterSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    mobile_number: String,
    country: String,
    state: String,
    organization: String,
    work_preference: [String],
    contract_types: [String],
    scope: String,
    scope_attachment: {
        filename: String,  
        fileType: String, 
        path: String,  
        size: Number,  
        uploadedAt: { 
            type: Date, 
            default: Date.now,
        },
    },
    dob: Date,
    job_category: String,
    about: String,
    linkedin_link: String,
    job_industries: [String],
    location: String,
})

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

export default Recruiter;
