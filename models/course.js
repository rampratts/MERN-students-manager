const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }]
})

module.exports = mongoose.model("Course", CourseSchema);