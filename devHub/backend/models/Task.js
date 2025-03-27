const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
  },
  priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
