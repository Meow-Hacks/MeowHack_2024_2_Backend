const express = require('express');
const router = express.Router();
const {getGroups, addGroups, updateGroups, deleteGroups} = require('../controllers/groupController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, getGroups);
router.post('/', checkLessonsAdmin, addGroups);
router.put('/:id', checkLessonsAdmin, updateGroups);
router.delete('/:id', checkLessonsAdmin, deleteGroups);

module.exports = router;