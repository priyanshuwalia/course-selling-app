const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
