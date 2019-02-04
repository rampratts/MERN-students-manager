const expect = require("expect");
const request = require("supertest");
const jwt = require("jsonwebtoken");

const { app } = require("../server");
const { TokenPrefix } = require("../config/keys");

const { students, populateStudents } = require("./seed/seed");
const Student = require("../models/student");

//Create token for verified routes
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjNTc3NDI3NmRiYjJjMjIzMGY4MGZiYiIsIm5hbWUiOiJQZXJzb24gMSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoidXNlck9uZVBhc3MifSwiaWF0IjoxNTQ5MjM1MjM5fQ.T8MCZwUMkaQy9_80G85GIHTToDXgXY66HvoVyTKKhzo";

beforeEach(populateStudents);

describe("POST /students/add", () => {
    const name = "Mauricio";
    const email = "mauri@gmail.com";
    const phone = "123213";

    const updatedName = "Lucía";
    const updatedEmail = "lucia@gmail.com";
    const updatedPhone = "23123";

    it("should create new student", done => {
        request(app)
            .post("/api/students/add")
            .set("authorization", `${TokenPrefix} ${token}`)
            .send({ name, email, phone })
            .expect(200)
            .expect(res => {
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

    it("should not create new student if not authenticated", done => {
        request(app)
            .post("/api/students/add")
            .send({ name, email, phone })
            .expect(401)
            .expect(res => {
                expect(res.body).toMatchObject({})
            })
            .end(done);
    })


    it("should update the student", done => {
        request(app)
            .patch("/api/students/")
            .set("authorization", `${TokenPrefix} ${token}`)
            .send({
                id: students[0]._id,
                name: updatedName,
                email: updatedEmail,
                phone: updatedPhone,
            })
            .expect(200)
            .expect(res => {
                expect(res.body.response).toBeTruthy()
            })
            .end(err => {
                if (err) return done(err);

                Student.findById(students[0]._id).then(student => {
                    expect(student.name).toBe(updatedName);
                    expect(student.email).toBe(updatedEmail);
                    expect(student.phone).toBe(updatedPhone);

                    done();
                }).catch(e => done(e));
            });
    })

    it("should not update the student if not authenticated", done => {
        request(app)
            .patch("/api/students/")
            .send({
                id: students[0]._id,
                name: updatedName,
                email: updatedEmail,
                phone: updatedPhone,
            })
            .expect(401)
            .expect(res => {
                expect(res.body).toMatchObject({})
            })
            .end(done);
    })

    it("should return all students", done => {
        request(app)
            .get("/api/students/")
            .set("authorization", `${TokenPrefix} ${token}`)
            .expect(200)
            .expect(res => {
                expect(res.body.students).toBeTruthy();
                expect(res.body.students.length).toBe(2);
                expect(res.body.students[0]._id.toString()).toBe(students[0]._id.toString());
                expect(res.body.students[1]._id.toString()).toBe(students[1]._id.toString());
            })
            .end(done);
    })

    it("should not return all students if not authenticated", done => {
        request(app)
            .get("/api/students/")
            .expect(401)
            .expect(res => {
                expect(res.body).toMatchObject({})
            })
            .end(done);
    })

    it("should return a single student", done => {
        request(app)
            .get(`/api/students/${students[0]._id}`)
            .set("authorization", `${TokenPrefix} ${token}`)
            .expect(200)
            .expect(res => {
                expect(res.body.students).toBeTruthy();
                expect(res.body.students.length).toBe(1);
                expect(res.body.students[0]._id.toString()).toBe(students[0]._id.toString());
            })
            .end(done);
    })

    it("should not return a student if not authenticated", done => {
        request(app)
            .get("/api/students/")
            .expect(401)
            .expect(res => {
                expect(res.body).toMatchObject({})
            })
            .end(done);
    })


})