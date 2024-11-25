const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, studentsController.getStudents);
router.get('/:id', checkLessonsAdmin, studentsController.getStudentById);
router.post('/', checkLessonsAdmin, studentsController.addStudents);
router.put('/:id', checkLessonsAdmin, studentsController.updateStudents);
router.delete('/:id', checkLessonsAdmin, studentsController.deleteStudent);

module.exports = router;