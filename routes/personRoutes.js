const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// POST route to add a person
router.post("/", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
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
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    console.error("❌ Error fetching persons:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT route to update a person
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return updated doc
        runValidators: true, // validate schema on update
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("✅ Person updated:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error("❌ Error updating person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Router
router.delete('/:id',async(req,res)=>{
  try{
  const personId = req.params.id;
  const response = await Person.findByIdAndDelete(personId);
   
  if(!response){
     return res.status(404).json({error:'Person not found'})
  }
  console.log('Data delete');
  res.status(200).json({message:'person delete successfully'})
  
  }catch(err){
 console.log(err);
 res.status(500).json({error:'Internal server error'})
 }
})

module.exports = router;

