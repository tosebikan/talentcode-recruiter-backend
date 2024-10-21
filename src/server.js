import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js';
import talentRoute from './routes/talent.js';
import recruiterRoute from './routes/recruiter.js';
import industryRoute from './routes/industryData.js'
import countriesRoute from './routes/countries.js'
import uploadRouter from './routes/upload.js'
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('MongoDB connected'))
.catch((err)=> console.log('MongoDB connection error', err))

app.get('/', (req, res)=> {
    res.send("welcome to the recruiting platform api")
});

app.use('/api/auth', authRoute);
app.use('/api/talent', talentRoute);
app.use('/api/recruiter', recruiterRoute);
app.use('/api', industryRoute);
app.use('/api', countriesRoute);
app.use('/api', uploadRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))