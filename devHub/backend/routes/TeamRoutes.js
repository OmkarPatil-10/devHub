// const express = require("express");
// const router = express.Router();
// const Team = require("../models/Team");

// // Create a team
// router.post("/create", async (req, res) => {
//   const { name, ownerId } = req.body;

//   try {
//     const newTeam = new Team({
//       name,
//       owner: ownerId,
//       members: [{ userId: ownerId, role: "owner" }]
//     });

//     await newTeam.save();
//     res.status(201).json(newTeam);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Add a member
// router.post("/:teamId/add-member", async (req, res) => {
//   const { userId } = req.body;
//   const { teamId } = req.params;

//   try {
//     const team = await Team.findById(teamId);
//     if (!team) return res.status(404).json({ error: "Team not found" });

//     team.members.push({ userId, role: "member" });
//     await team.save();

//     res.json(team);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// ✅ Create a new team
router.post("/create", async (req, res) => {
  const { name, ownerId } = req.body;

  if (!name || !ownerId) {
    return res.status(400).json({ error: "Missing required fields: name, ownerId" });
  }

  try {
    const newTeam = new Team({
      name,
      owner: ownerId,
      members: [{ userId: ownerId, role: "owner" }],
    });

    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Add a member to a team
router.post("/:teamId/add-member", async (req, res) => {
  const { userId } = req.body;
  const { teamId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    team.members.push({ userId, role: "member" });
    await team.save();

    res.json(team);
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
