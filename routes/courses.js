const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load course model
const Course = require("../models/course");

//Load Student reference
const Student = require("../models/student");

//Load auth middleawre
const { authRequired } = require("../middleware/auth");

//Add course to database
router.post("/add", authRequired, (req, res) => {
    const { name } = req.body;

    const newCourse = new Course({
        name,
    })

    newCourse.save()
        .then(course => {
            res.send({
                success: true,
                course
            })
        })
        .catch(e => res.send(e));
})

router.patch("/addStudents", authRequired, async (req, res) => {
    const { courseId, std } = req.body;

    //Find all students passed in the body
    const students = await Student.find({
        "_id": {
            $in: std
        }
    })

    let filteredStudents = []

    //Filter students by those who are already in the course
    const course = await Course.findById(courseId);

    if (course.students.length > 0) {
        filteredStudents = students.filter(
            student => course.students.every(inscriptedStudent => inscriptedStudent._id.toString() !== student._id.toString()))
    } else {
        filteredStudents = students;
    }

    //If all the students exist in the course, dont add anybody
    if (filteredStudents.length === 0) {
        res.send({
            success: false,
            message: "Students already exist"
        })
        return null
    }

    //Get the updated course
    const updatedCourse = await Course.findByIdAndUpdate(courseId, { $push: { students: filteredStudents } })

    //Add the course to each student.courses[]
    filteredStudents.forEach(async student => {
        const updatedStudent = await Student.findByIdAndUpdate(student, { $push: { courses: { courseId } } })
    });

    //Send the updated course
    res.send({
        updatedCourse
    })
})

module.exports = router;