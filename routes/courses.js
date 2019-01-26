const express = require("express");
const router = express.Router();

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

router.patch("/addStudents", authRequired, (req, res) => {
    const { courseId, students } = req.body;
    const courseToStudents = {
        courseId,
    }

    Course.findByIdAndUpdate(courseId, { $push: { students: students } })
        .then(updatedCourse => {
            students.forEach(student => {
                Student.findByIdAndUpdate(student, { $push: { courses: courseToStudents } })
                    .then(updatedObject => null)
                    .catch(e => console.log(e))
            });
            res.send({ updatedCourse })
        })
        .catch(e => res.send(e))
})

module.exports = router;