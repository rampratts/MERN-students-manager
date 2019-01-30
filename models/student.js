const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
    },
    courses: [{
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course"
        },
        marks: {
            type: Number
        }
    }]
});

module.exports = mongoose.model("Student", StudentSchema);