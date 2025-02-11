const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Course = require("../models/Course");
const User = require("../models/User");

// ✅ Get all available courses with search & filter
router.get("/courses/all", async (req, res) => {
    try {
        const { category, keyword } = req.query;

        let query = {};
        if (category) query.category = category;
        if (keyword) query.title = { $regex: keyword, $options: "i" };

        const courses = await Course.find(query);
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch courses" });
    }
});

// ✅ Get details of a single course by ID
router.get("/courses/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("lectures");
        if (!course) return res.status(404).json({ success: false, message: "Course not found" });

        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch course details" });
    }
});

// ✅ Fetch enrolled courses of the authenticated user
router.get("/myCourses", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("enrolledCourses");
        res.status(200).json({ success: true, courses: user.enrolledCourses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch enrolled courses" });
    }
});

// ✅ Enroll in a course
router.post("/courses/:id/enroll", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ success: false, message: "Course not found" });
        if (user.enrolledCourses.includes(course._id)) {
            return res.status(400).json({ success: false, message: "Already enrolled in this course" });
        }

        user.enrolledCourses.push(course._id);
        await user.save();

        res.status(200).json({ success: true, message: "Enrolled successfully", course });
    } catch (error) {
        res.status(500).json({ success: false, message: "Enrollment failed" });
    }
});

// ✅ Get lectures of a specific course
router.get("/courses/:id/lectures", authMiddleware, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("lectures");
        if (!course) return res.status(404).json({ success: false, message: "Course not found" });

        res.status(200).json({ success: true, lectures: course.lectures });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch lectures" });
    }
});

module.exports = router;
