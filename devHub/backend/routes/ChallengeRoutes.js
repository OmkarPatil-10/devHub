const express = require("express");
const router = express.Router();
const Challenge=require("../models/ChallengeSchema");



// Create a new challenge
router.post("/create", async (req, res) => {
    try {
        const { title, description, requiredSkills, deadline, createdBy, participants, tasks } = req.body;

        const newChallenge = new Challenge({
            title,
            description,
            requiredSkills,
            deadline,
            createdBy,
            participants,
            tasks,
        });

        await newChallenge.save();
        res.status(201).json({ message: "Challenge created successfully", challenge: newChallenge });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all challenges
router.get("/get", async (req, res) => {
    try {
        const challenges = await Challenge.find().populate("createdBy", "name email").populate("participants", "name email");
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


