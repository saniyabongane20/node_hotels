const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String, // ✅ Capital S
      required: true,
      trim: true
    },
    price: {
      type: Number, // ✅ Capital N
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      enum: ["starter", "main", "dessert", "drink"], // ✅ categories
      required: true
    }
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
