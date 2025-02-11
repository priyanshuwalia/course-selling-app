const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/:userId/purchase/:courseId', authMiddleware, userController.purchaseCourse);

module.exports = router;