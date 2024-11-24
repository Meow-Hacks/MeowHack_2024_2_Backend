const express = require('express');
const router = express.Router();
const {getSubjects, addSubject, updateSubject, deleteSubject} = require('../controllers/subjectsController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, getSubjects);
router.post('/', checkLessonsAdmin, addSubject);
router.put('/:id', checkLessonsAdmin, updateSubject);
router.delete('/:id', checkLessonsAdmin, deleteSubject);

module.exports = router;