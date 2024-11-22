const express = require('express');
const router = express.Router();
const {getStudentAttendance, getLessonAttendance} = require('../controllers/attendanceController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/students/:id', checkAdmin, getStudentAttendance);
router.get('/lesson/:id', checkAdmin, getLessonAttendance);

module.exports = router;