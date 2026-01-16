const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// 🌐 Rate Limiters
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: { error: "Too many requests. Try again later." }
});

const resultLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { error: "Too many result searches. Please wait." }
});

app.use("/api", apiLimiter);
app.use("/api/students/result", resultLimiter);

// 🩺 Health Check
app.get("/health", (req, res) => {
  res.send("OK");
});

// 📦 Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

// 🗄 MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on", PORT));
