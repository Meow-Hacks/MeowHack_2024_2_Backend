const express = require('express');
const router = express.Router();
const {getTeachers, addTeachers, updateTeachers, deleteTeachers} = require('../controllers/teacherController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, getTeachers);
router.post('/', checkLessonsAdmin, addTeachers);
router.put('/:id', checkLessonsAdmin, updateTeachers);
router.delete('/:id', checkLessonsAdmin, deleteTeachers);

module.exports = router;