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

module.exports = router;