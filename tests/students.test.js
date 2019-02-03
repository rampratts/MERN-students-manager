const expect = require("expect");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");

const { app } = require("../server");
const { SecretKey, TokenPrefix } = require("../config/keys");

const { students, populateStudents } = require("./seed/seed");
const Student = require("../models/student");

//Create token for verified routes
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjNTc3NDI3NmRiYjJjMjIzMGY4MGZiYiIsIm5hbWUiOiJQZXJzb24gMSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoidXNlck9uZVBhc3MifSwiaWF0IjoxNTQ5MjM1MjM5fQ.T8MCZwUMkaQy9_80G85GIHTToDXgXY66HvoVyTKKhzo";

beforeEach(populateStudents);

describe("POST /students/add", () => {
    const name = "Mauricio";
    const email = "mauri@gmail.com";
    const phone = "123213";

    it("should create new student", done => {
        request(app)
            .post("/api/students/add")
            .set("authorization", `${TokenPrefix} ${token}`)
            .send({ name, email, phone })
            .expect(200)
            .expect(res => {
                console.log(res.body)
                expect(res.body.success).toBe(true);
                expect(res.body.student).toBeTruthy()
            })
            .end(err => {
                if (err) return done(err);

                Student.findOne({ name }).then(student => {
                    expect(student).toBeTruthy();
                    done();
                }).catch(e => done(e));
            })
    })
})