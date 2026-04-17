// src/config.js

// Automatically switch between local and production backend URLs
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-render-backend.onrender.com/api"   // 🔗 Replace with your actual Render backend URL
    : "http://localhost:5000/api";                     // Local backend for development

export default API_BASE_URL;
