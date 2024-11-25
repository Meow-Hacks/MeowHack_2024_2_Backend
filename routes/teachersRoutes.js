const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teacherController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, teachersController.getTeachers);
router.get('/:id', checkLessonsAdmin, teachersController.getTeacherById);
router.post('/', checkLessonsAdmin, teachersController.addTeachers);
router.put('/:id', checkLessonsAdmin, teachersController.updateTeachers);
router.delete('/:id', checkLessonsAdmin, teachersController.deleteTeachers);

module.exports = router;