const express = require('express');
const router = express.Router();
const Challenge = require('../models/challenge');

router.post('/', async (req, res) => {
    const { experience, language, availability, search } = req.body;

    try {
        const query = {
            $and: [
                experience ? { experience } : {},
                language ? { language } : {},
                availability ? { availability } : {},
                search ? { title: { $regex: search, $options: "i" } } : {}
            ]
        };

        const challenges = await Challenge.find(query).sort({ updatedAt: -1 });
        res.json(challenges);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;