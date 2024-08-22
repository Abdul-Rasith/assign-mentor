const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor'); 
const Student = require('../models/Student');

// API to create a mentor
router.post('/mentors', async (req, res) => {
    try {
        const { name, email, expertise } = req.body;
        const newMentor = new Mentor({ name, email, expertise });
        await newMentor.save();
        res.status(201).json(newMentor);
    } catch (error) {
        res.status(500).json({ message: "Error creating mentor", error });
    }
});

// API to assign multiple students to a mentor
router.post('/mentors/:mentorId/assign-students', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const { studentIds } = req.body;

        // Check if the mentor exists
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        // Update the students' mentor field if they don't already have a mentor
        const updatedStudents = await Student.updateMany(
            { _id: { $in: studentIds }, mentor: { $exists: false } }, // Only update students without a mentor
            { $set: { mentor: mentorId } },
            { new: true }
        );

        // Check if any students were actually updated
        if (updatedStudents.nModified === 0) {
            return res.status(400).json({ message: "No students were assigned to the mentor. They may already have a mentor." });
        }

        // Update the mentor's students list
        mentor.students.push(...studentIds);
        await mentor.save();

        res.status(200).json({ message: "Students assigned to mentor", mentor });
    } catch (error) {
        console.error("Error assigning students:", error);
        res.status(500).json({ message: "Error assigning students", error: error.message || error });
    }
});



// API to show all students for a particular mentor
router.get('/mentors/:mentorId/students', async (req, res) => {
    try {
        const { mentorId } = req.params;

        const mentor = await Mentor.findById(mentorId).populate('students');
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        res.status(200).json({ students: mentor.students });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving students", error });
    }
});

router.get('/mentors', async(req,res)=>{
    try{
        const mentors = await Mentor.find()
        res.status(200).json(mentors)
    }
    catch(error){
        res.status(500).json({message:"Error retrieving students", error})
    }
    
})

module.exports = router;
