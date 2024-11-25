const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/students/:id', checkLessonsAdmin, attendanceController.getStudentAttendance);
router.get('/lesson/:id', checkLessonsAdmin, attendanceController.getLessonAttendance);

module.exports = router;