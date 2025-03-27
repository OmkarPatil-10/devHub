// const express = require("express");
// const router = express.Router();
// const Task = require("../models/Task");

// // Create a task
// router.post("/create", async (req, res) => {
//   const { title, description, assignedTo, teamId } = req.body;

//   try {
//     const newTask = new Task({
//       title,
//       description,
//       assignedTo,
//       teamId,
//     });

//     await newTask.save();
//     res.status(201).json(newTask);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update task status
// router.put("/:taskId/status", async (req, res) => {
//   const { status } = req.body;
//   const { taskId } = req.params;

//   try {
//     const task = await Task.findByIdAndUpdate(
//       taskId,
//       { status },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ error: "Task not found" });

//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get all tasks for a team
// router.get("/:teamId", async (req, res) => {
//   const { teamId } = req.params;

//   try {
//     const tasks = await Task.find({ teamId });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Task = require("../models/Task");

// // ✅ Create a new task with status
// router.post("/create", async (req, res) => {
//   const { title, description, assignedTo, teamId, status } = req.body;

//   try {
//     const newTask = new Task({
//       title,
//       description,
//       assignedTo,
//       teamId,
//       status: status || "todo", // ✅ Default to "todo" if not provided
//     });

//     await newTask.save();
//     res.status(201).json(newTask);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Update task status
// router.put("/:taskId/status", async (req, res) => {
//   const { status } = req.body;
//   const { taskId } = req.params;

//   try {
//     const task = await Task.findByIdAndUpdate(
//       taskId,
//       { status },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ error: "Task not found" });

//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Get all tasks for a team (returns all tasks with their statuses)
// router.get("/:teamId", async (req, res) => {
//   const { teamId } = req.params;

//   try {
//     const tasks = await Task.find({ teamId });

//     res.json({
//       todo: tasks.filter((task) => task.status === "todo"),
//       inProgress: tasks.filter((task) => task.status === "in-progress"),
//       done: tasks.filter((task) => task.status === "done"),
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ✅ Create a new task with status & priority
router.post("/create", async (req, res) => {
  const { title, description, assignedTo, teamId, status, priority } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      assignedTo,
      teamId,
      status: status || "todo",  // ✅ Default "todo" status
      priority: priority || "low" // ✅ Default "low" priority if not provided
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update task status & priority
// router.put("/:taskId", async (req, res) => {
//   const { status, priority } = req.body;
//   const { taskId } = req.params;

//   try {
//     const task = await Task.findByIdAndUpdate(
//       taskId,
//       { status, priority },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ error: "Task not found" });

//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.put("/:taskId", async (req, res) => {
  const { title, description, status, priority } = req.body;
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, priority },  // ✅ Now updating all fields
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ Get all tasks for a team (returns tasks categorized by status)
router.get("/:teamId", async (req, res) => {
  const { teamId } = req.params;

  try {
    const tasks = await Task.find({ teamId });

    res.json({
      todo: tasks.filter((task) => task.status === "todo").map(task => ({ ...task._doc, priority: task.priority || "low" })),
      inProgress: tasks.filter((task) => task.status === "in-progress").map(task => ({ ...task._doc, priority: task.priority || "low" })),
      done: tasks.filter((task) => task.status === "done").map(task => ({ ...task._doc, priority: task.priority || "low" })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a task by ID
router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
