const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["owner", "member"], default: "member" }
    }
  ],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
});

module.exports = mongoose.model("Team", TeamSchema);
