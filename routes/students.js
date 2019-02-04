const express = require("express");
const router = express.Router();

//Load Student Model
const Student = require("../models/student");

//Load auth middleware 
const { authRequired } = require("../middleware/auth");

//Get student(s)
//Takes the id of a single student as optional, otherwise every student will be returned

router.get("/:_id?", authRequired, async (req, res) => {
    const { _id } = req.params;
    let students;

    if (!_id) {
        students = await Student.find();
    } else {
        students = await Student.find({ _id })
    }

    res.send({ students })
})

//Add student
router.post("/add", authRequired, (req, res) => {
    const { name, email, phone, courses } = req.body;

    const newStudent = new Student({
        name,
        email,
        phone,
        courses
    })

    newStudent.save()
        .then(student => {
            res.send({
                success: true,
                student
            })
        })
        .catch(e => res.send(e))
})

//Update student
router.patch("/", authRequired, async (req, res) => {
    const { id, name, email, phone, courses } = req.body;

    const originalStudent = await Student.findById(id).lean();

    let updatedCourses = originalStudent.courses;
    let updatedCourse = {}
    let courseIndex = -1;

    //Update marks if needed
    if (courses) {
        courseIndex = updatedCourses.findIndex(course => course.courseId.toString() === courses.id.toString());
        updatedCourse = updatedCourses.splice(courseIndex, 1);

        updatedCourse[0].marks = courses.marks;
        updatedCourses.push(updatedCourse[0]);
    }

    //Create a new updated student
    const updatedStudent = {
        name: name ? name : originalStudent.name,
        email: email ? email : originalStudent.email,
        phone: phone ? phone : originalStudent.phone,
    }

    const response = await Student.findOneAndUpdate({ _id: id }, {
        name: updatedStudent.name,
        email: updatedStudent.email,
        phone: updatedStudent.phone,
        "$set": {
            courses: updatedCourses
        }
    })

    res.send({ response })
})

module.exports = router;