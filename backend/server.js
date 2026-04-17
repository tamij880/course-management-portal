// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const materialRoutes = require("./routes/materials");

const app = express();

// ✅ Secure CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",                   // local dev
      "https://alfa-coaching-portal.vercel.app", // 👈 your actual Vercel frontend link
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse JSON
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
