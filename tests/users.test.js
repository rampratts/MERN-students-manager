const expect = require("expect");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { SecretKey, TokenPrefix } = require("../config/keys");

const { app } = require("../server");

const { users, populateUsers } = require("./seed/seed");
const User = require("../models/user");

beforeEach(populateUsers)

describe("POST /users/register", () => {
    const name = "Test"
    const email = "example@test.com";
    const password = "validPassword";

    it("should create a new user", (done) => {
        request(app)
            .post("/api/users/register")
            .send({ name, email, password })
            .expect(200)
            .expect(res => {
                expect(res.body.success).toBe(true)
                expect(res.body.user.email).toBe(email);
            })
            .end(err => {
                if (err) return done(err);

                User.findOne({ email }).then(user => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch(e => done(e))
            })

    })
})