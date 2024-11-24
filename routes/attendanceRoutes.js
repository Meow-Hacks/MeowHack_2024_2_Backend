const express = require('express');
const router = express.Router();
const {getStudentAttendance, getLessonAttendance} = require('../controllers/attendanceController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/students/:id', checkLessonsAdmin, getStudentAttendance);
router.get('/lesson/:id', checkLessonsAdmin, getLessonAttendance);

module.exports = router;