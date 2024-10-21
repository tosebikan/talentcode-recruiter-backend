import express from "express";
const router = express.Router();
import countries from "../constants/countries.json" assert { type: "json" };

router.get("/countries-data", (req, res) => {
    try{
        res.json(countries);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

export default router
