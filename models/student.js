const mongoose = require("mongoose");
const Schema = moongoose.Schema;

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
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
});

module.exports = mongoose.model("Student", StudentSchema);