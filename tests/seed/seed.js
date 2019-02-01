const { ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");

const User = require("../../models/user");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();


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
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
}

module.exports = { users, populateUsers };