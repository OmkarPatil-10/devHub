const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    createdBy: String,
    title: String,
    description: String,
    experience: String,
    language: String,
    availability: String
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);