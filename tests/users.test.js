const expect = require("expect");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { SecretKey, TokenPrefix } = require("../config/keys");

const { app } = require("../server");

const { users, populateUsers } = require("./seed/seed");
const User = require("../models/user");

beforeEach(populateUsers)

describe("POST /users/register", () => {
    //Valid data
    const name = "Test"
    const email = "example@test.com";
    const password = "validPassword";

    //Invalid data
    const invalidEmail = "test";
    const invalidPass = "123";

    //Existing data
    const existingEmail = users[0].email;

    it("should create a new user", done => {
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

    it("should not create user if invalid data", done => {
        request(app)
            .post("/api/users/register")
            .send({ name, email: invalidEmail, password: invalidPass })
            .expect(400)
            .expect(res => {
                expect(res.body.user).toBeFalsy();
            })
            .end(done);
    });

    it("should not create user if email already exists", done => {
        request(app)
            .post("/api/users/register")
            .send({ name, email: existingEmail, password })
            .expect(400)
            .expect(res => {
                expect(res.body.user).toBeFalsy();
            })
            .end(done);
    });
})