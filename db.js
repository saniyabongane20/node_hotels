const mongoose = require("mongoose");
require('dotenv').config();
// Define MongoDB connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL // ✅ use 127.0.0.1 instead of localhost
const mongoURL = process.env.MONGODB_URL;
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
