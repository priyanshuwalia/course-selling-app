const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware"); 
const Course = require("../models/Course"); 
const Lecture = require("../models/Lecture");
const Quiz = require("../models/Quiz"); 


router.post("/add-course", adminMiddleware, async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const newCourse = new Course({ title, description, price });
        await newCourse.save();
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        res.status(500).json({ message: "Failed to add course", error: error.message });
    }
});

router.put("/edit-course/:id", adminMiddleware, async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
        res.json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Failed to update course", error: error.message });
    }
});


router.delete("/delete-course/:id", adminMiddleware, async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
        res.json({ message: `Course '${deletedCourse.title}' deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete course", error: error.message });
    }
});

router.post("/add-lecture/:courseId", adminMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const newLecture = new Lecture({ title, content, courseId: req.params.courseId });
        await newLecture.save();
        res.status(201).json({ message: "Lecture added successfully", lecture: newLecture });
    } catch (error) {
        res.status(500).json({ message: "Failed to add lecture", error: error.message });
    }
});

router.put("/edit-lecture/:lectureId", adminMiddleware, async (req, res) => {
    try {
        const updatedLecture = await Lecture.findByIdAndUpdate(req.params.lectureId, req.body, { new: true });
        if (!updatedLecture) return res.status(404).json({ message: "Lecture not found" });
        res.json({ message: "Lecture updated successfully", lecture: updatedLecture });
    } catch (error) {
        res.status(500).json({ message: "Failed to update lecture", error: error.message });
    }
});

router.delete("/delete-lecture/:lectureId", adminMiddleware, async (req, res) => {
    try {
        const deletedLecture = await Lecture.findByIdAndDelete(req.params.lectureId);
        if (!deletedLecture) return res.status(404).json({ message: "Lecture not found" });
        res.json({ message: `Lecture '${deletedLecture.title}' deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete lecture", error: error.message });
    }
});

router.post("/add-material/:lectureId", adminMiddleware, async (req, res) => {
    try {
        const { material } = req.body;
        const lecture = await Lecture.findById(req.params.lectureId);
        if (!lecture) return res.status(404).json({ message: "Lecture not found" });

        lecture.materials.push(material);
        await lecture.save();
        res.status(201).json({ message: "Material added successfully", lecture });
    } catch (error) {
        res.status(500).json({ message: "Failed to add material", error: error.message });
    }
});

router.post("/add-quiz/:courseId", adminMiddleware, async (req, res) => {
    try {
        const { title, questions } = req.body;
        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const newQuiz = new Quiz({ title, questions, courseId: req.params.courseId });
        await newQuiz.save();
        res.status(201).json({ message: "Quiz added successfully", quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ message: "Failed to add quiz", error: error.message });
    }
});

router.put("/edit-quiz/:quizId", adminMiddleware, async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.quizId, req.body, { new: true });
        if (!updatedQuiz) return res.status(404).json({ message: "Quiz not found" });
        res.json({ message: "Quiz updated successfully", quiz: updatedQuiz });
    } catch (error) {
        res.status(500).json({ message: "Failed to update quiz", error: error.message });
    }
});

router.delete("/delete-quiz/:quizId", adminMiddleware, async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.quizId);
        if (!deletedQuiz) return res.status(404).json({ message: "Quiz not found" });
        res.json({ message: `Quiz '${deletedQuiz.title}' deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete quiz", error: error.message });
    }
});

module.exports = router;
