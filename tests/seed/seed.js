const { ObjectID } = require("mongodb");

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


const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
}

module.exports = { users, populateUsers };