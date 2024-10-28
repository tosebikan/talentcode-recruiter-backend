import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Talent from "../models/Talent.js";
import Recruiter from "../models/Recruiter.js";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "user already exists" });

        user = new User({
            first_name,
            last_name,
            email,
            password,
            role,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
            if (err) throw err;

            res.json({
                status: true,
                message: 'Signup successful',
                data: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role,
                    token
                },
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

// login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        let profile 

        if (!user) return res.status(400).json({ msg: "user does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });


        if(user?.role === 'talent') profile = await Talent.findOne({ user: user.id });
        if(user?.role === 'recruiter') profile = await Recruiter.findOne({ user: user.id });

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };
      
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
            if (err) throw err;
            res.json({
                status: true,
                message: 'Login successful',
                data: {
                    ...(profile ? profile._doc : {}),
                    ...user._doc,
                    id: user.id,
                    token
                },
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

export default router;
