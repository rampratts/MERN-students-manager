const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//Load the user model
const User = require("../models/user");

router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;

    if (password !== password2) {
        res.send({ error: "Passwords don't match" })
    }

    const newUser = new User({
        name,
        email,
        password,
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    res.send({
                        success: true,
                        user
                    })
                })
                .catch(err => res.send(err))
        })
    })


})

module.exports = router;