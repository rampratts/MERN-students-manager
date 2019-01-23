const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;