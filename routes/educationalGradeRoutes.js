const express = require('express');
const router = express.Router();
const educationalGradeController = require('../controllers/educationalGradeController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/gpa/:id', checkLessonsAdmin, educationalGradeController.getStudentGPA);
router.get('/percentil/:id', checkLessonsAdmin, educationalGradeController.getStudentPercentil);

module.exports = router;