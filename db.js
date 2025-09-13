// db.js
const mongoose = require("mongoose");

// Define MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotel"; // ✅ use 127.0.0.1 instead of localhost

// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners
db.on("connected", () => {
  console.log("✅ Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("❌ MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

module.exports = mongoose;
