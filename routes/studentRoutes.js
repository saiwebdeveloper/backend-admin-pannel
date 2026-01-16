const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Add Student
router.post("/add", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// Get All Students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Delete Student
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

router.get("/result/:hallticket", async (req, res) => {
  try {
    const student = await Student.findOne({
      hallticket: req.params.hallticket
    });

    if (!student) {
      return res.status(404).json({ msg: "Result not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
