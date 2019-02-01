const expect = require("expect");
const request = require("supertest");

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

describe("POST /users/login", () => {
    //Valid user
    const email = users[0].email;
    const password = users[0].password;
    const invalidPassword = "invalidpassword";

    it("should login the user and return token", done => {
        request(app)
            .post("/api/users/login")
            .send({ email, password })
            .expect(200)
            .expect(res => {
                expect(res.body.token).toBeTruthy();
            })
            .end(done);
    })

    it("should not login the user if password is invalid", done => {
        request(app)
            .post("/api/users/login")
            .send({ email, password: invalidPassword })
            .expect(400)
            .expect(res => {
                expect(res.body.success).toBe(false);
                expect(res.body.token).toBeFalsy();
            })
            .end(done);
    })


    it("should not login the user if email is invalid", done => {
        request(app)
            .post("/api/users/login")
            .send({ email: "invalidemail", password })
            .expect(404)
            .expect(res => {
                expect(res.body.success).toBe(false);
                expect(res.body.token).toBeFalsy();
            })
            .end(done);
    })
})