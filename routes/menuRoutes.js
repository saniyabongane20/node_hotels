const express = require('express')
const router = express.Router();
const Menu = require("../models/Menu");

// POST route to add a menu
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    const savedMenu = await newMenu.save();

    console.log("✅ Menu saved:", savedMenu);
    res.status(201).json(savedMenu);
  } catch (err) {
    console.error("❌ Error saving menu:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET all menus
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    console.error("❌ Error fetching menu:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//comment added for testing purposes
module.exports =router