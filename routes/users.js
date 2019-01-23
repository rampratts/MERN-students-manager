const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Load the user model
const User = require("../models/user");

//Load secretpassword
const { SecretKey } = require("../config/keys");

//Login middleware
const { authRequired } = require("../middleware/auth");

router.post("/test", authRequired, (req, res) => {
    jwt.verify(req.token, SecretKey, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.send({
            message: "Logged in!",
            data
        })
    })
})

//User login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        bcrypt.compare(password, user.password).then(match => {
            if (!match) {
                res.send({
                    success: false,
                    error: "Incorrect password"
                });
            }

            jwt.sign({ user }, SecretKey, (err, token) => {
                res.send({ token });
            })
        }).catch(err => res.send(err))
    })
})


//User registration
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