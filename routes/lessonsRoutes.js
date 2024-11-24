const express = require('express');
const router = express.Router();
const {getLessons, addLessons, updateLesson, deleteLesson} = require('../controllers/lessonsController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, getLessons);
router.post('/', checkLessonsAdmin, addLessons);
router.put('/:id', checkLessonsAdmin, updateLesson);
router.delete('/:id', checkLessonsAdmin, deleteLesson);

module.exports = router;