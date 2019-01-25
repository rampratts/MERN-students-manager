const express = require("express");
const router = express.Router();

//Load Student Model
const Student = require("../models/student");

//Load auth middleware 
const { authRequired } = require("../middleware/auth");


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

module.exports = router;