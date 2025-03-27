// const express = require('express')
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express()
// const port = 3000
// const TeamRoutes=require("./routes/TeamRoutes");
// require('dotenv').config();
// console.log(process.env.MONGO_URL);
// mongoose.connect(process.env.MONGO_URL)
// .then(() => console.log('Connected to MongoDB'))
//  .catch(err => console.error(err));

// app.use(cors(
//     {
//         origin:'http://localhost:5173',
//         methods:['GET', 'POST','DELETE','PUT'],
//         allowedHeaders:[
//             "Content-Type",
//             "Authorization",
//             "Cache-Control",
//             "Expires",
//             "Pragma"
//         ],
//         credentials:true
//     }
// ))

// app.use(express.json());
// app.use("/api/teams",TeamRoutes);

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//     })

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const TeamRoutes = require("./routes/TeamRoutes");
const TaskRoutes = require("./routes/TaskRoutes");
const ChallengeRoutes = require("./routes/ChallengeRoutes");
const authRoutes = require("./routes/authRoutes")

// ✅ Debugging: Check if MONGO_URL is loaded
console.log("MongoDB URL:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 10000, // Wait 10s before failing
    socketTimeoutMS: 45000, // Keep socket open for 45s
    connectTimeoutMS: 30000, // 30s connection timeout
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));
  

// ✅ CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5176","http://localhost:5177","http://localhost:5174"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allows cookies
  })
);

// ✅ Middleware to Parse JSON (IMPORTANT: Must be before routes)
app.use(express.json());
app.use(cookieParser());

// ✅ Debugging Middleware: Logs incoming requests
app.use((req, res, next) => {
  console.log("📩 Incoming Request:", req.method, req.url);
  console.log("🔹 Headers:", req.headers);
  console.log("🔹 Body:", req.body);
  next();
});

// Register Route
// app.post('/register', async (req, res) => {
//   try {
//       const { name, email, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({ name, email, password: hashedPassword });
//       await user.save();
//       res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//       res.status(400).json({ error: 'User already exists' });
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user) return res.status(400).json({ error: 'User not found' });
      
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
      
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token, user: { name: user.name, email: user.email } });
//   } catch (error) {
//       res.status(500).json({ error: 'Server error' });
//   }
// });

//  Routes
app.use("/api/auth",authRoutes);
app.use("/api/teams", TeamRoutes);
app.use("/api/tasks", TaskRoutes);
app.use("/api/challenges", ChallengeRoutes);
// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
