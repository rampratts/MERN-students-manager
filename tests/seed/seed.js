const { ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");

const User = require("../../models/user");
const Student = require("../../models/student");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const studentId = new ObjectID();
const courseId = new ObjectID();

//Create testing users
const users = [{
    _id: userOneId,
    name: "Person 1",
    email: "test@example.com",
    password: "userOnePass",
},
{
    _id: userTwoId,
    name: "Person 2",
    email: "test2@example.com",
    password: "userTwoPass",
}]

//Encrypt passwords
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(users[0].password, salt, (err, hash) => {
        users[0].password = hash;
    })

    bcrypt.hash(users[1].password, salt, (err, hash) => {
        users[1].password = hash;
    })
})

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
}

//Students seed

const students = [{
    _id: studentId,
    name: "Pedro",
    email: "pedro@gmail.com",
    phone: "0964561",
    courses: [{
        courseId
    }]
}]

const populateStudents = done => {
    Student.deleteMany({}).then(() => {
        const studentOne = new Student(students[0]).save()

        return Promise.all([studentOne]);
    }).then(() => done());
}


module.exports = { users, populateUsers, students, populateStudents };