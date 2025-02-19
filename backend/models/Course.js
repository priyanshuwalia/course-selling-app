const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture"
    }],
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
