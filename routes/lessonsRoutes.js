const express = require('express');
const router = express.Router();
const lessonsController = require('../controllers/lessonsController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, lessonsController.getLessons);
router.get('/:id', checkLessonsAdmin, lessonsController.getLessonById);
router.post('/', checkLessonsAdmin, lessonsController.addLessons);
router.put('/:id', checkLessonsAdmin, lessonsController.updateLesson);
router.delete('/:id', checkLessonsAdmin, lessonsController.deleteLesson);

module.exports = router;