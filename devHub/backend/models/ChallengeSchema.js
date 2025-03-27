const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
    title: String,
    description: String,
    requiredSkills: [String],
    deadline: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }] // Reference Task model
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
