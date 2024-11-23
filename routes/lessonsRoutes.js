const express = require('express');
const router = express.Router();
const {getLessons, addLessons, updateLesson, deleteLesson} = require('../controllers/lessonsController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getLessons);
router.post('/', checkAdmin, addLessons);
router.put('/:id', checkAdmin, updateLesson);
router.delete('/:id', checkAdmin, deleteLesson);

module.exports = router;