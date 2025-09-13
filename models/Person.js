const mongoose = require("mongoose");

// Define the Person Schema
const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    work: {
      type: String,
      enum: ["chef", "waiter", "manager"],
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
  },
  { timestamps: true } // ✅ adds createdAt & updatedAt automatically
);

// ✅ Prevent OverwriteModelError
const Person =
  mongoose.models.Person || mongoose.model("Person", personSchema);

module.exports = Person;
