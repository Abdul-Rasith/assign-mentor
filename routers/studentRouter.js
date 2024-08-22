const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// API to create a student
router.post('/students', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newStudent = new Student({ name, email });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: "Error creating student", error });
    }
});

// API to assign or change mentor for a particular student
router.put('/students/:studentId/assign-mentor', async (req, res) => {
    try {
        const { studentId } = req.params;
        const { mentorId } = req.body;

        const student = await Student.findById(studentId);
        const mentor = await Mentor.findById(mentorId);

        if (!student || !mentor) {
            return res.status(404).json({ message: "Student or Mentor not found" });
        }

        // Update mentor information for the student
        student.mentor = mentorId;
        await student.save();

        // Optionally, update mentor with the student info
        mentor.students.addToSet(studentId);
        await mentor.save();

        res.status(200).json({ message: "Mentor assigned/changed for the student", student });
    } catch (error) {
        res.status(500).json({ message: "Error assigning mentor", error });
    }
});

// API to show the previously assigned mentor for a particular student
router.get('/students/:studentId/previous-mentor', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('previousMentors');

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ previousMentors: student.previousMentors });
    } catch (error) {
        console.error("Error retrieving previous mentors:", error);
        res.status(500).json({ message: "Error retrieving previous mentors", error: error.message || error });
    }
});

// get all student
router.get('/students', async(req,res)=>{
    try{
        const students = await Student.find()
        res.status(200).json(students)
    }
    catch(error){
        res.status(500).json({message:"Error retrieving students", error})
    }
})




module.exports = router;
