const express = require('express');
const router = express.Router();
const {getStudents, addStudents, updateStudents, deleteStudent} = require('../controllers/studentController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, getStudents);
router.post('/', checkLessonsAdmin, addStudents);
router.put('/:id', checkLessonsAdmin, updateStudents);
router.delete('/:id', checkLessonsAdmin, deleteStudent);

module.exports = router;