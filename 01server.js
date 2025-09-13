// server.js
const express = require("express");
const mongoose = require("./db"); // Connects to MongoDB
const Person = require("./models/Person");
const Menu = require("./models/Menu"); // ✅ fixed typo

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("🏨 Welcome to my hotel API");
});

// POST route to add a person
app.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();

    console.log("✅ Person saved:", savedPerson);
    res.status(201).json(savedPerson);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error("❌ Error saving person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET all persons
app.get("/person", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    console.error("❌ Error fetching persons:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route to add a menu
app.post("/menu", async (req, res) => {
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
app.get("/menu", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    console.error("❌ Error fetching menu:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// pass parameter
app.get("/person/:workType",async (req,res)=>{
    try{
        const workType =req.params.workType;
        if(workType=="chef" || workType=="manager" || workType=="waiter")
          {  const response = await Person.find({work:workType});
      console.log("✅ response fetched:", response);
      res.status(200).json(response);

    }else{
        res.status(404).json({error:'invalid worktype'})
    }
 }catch(err){
console.log(err);
res.status(500).json({error:'internal server error'})

    }
});

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu', menuRoutes)


// Start server only after MongoDB connection
mongoose.connection.once("open", () => {
  app.listen(3000, () => {
    console.log("🚀 Server listening on port 3000");
  });
});
