const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groupController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, groupsController.getGroups);
router.get('/:id', checkLessonsAdmin, groupsController.getGroupById);
router.post('/', checkLessonsAdmin, groupsController.addGroups);
router.put('/:id', checkLessonsAdmin, groupsController.updateGroups);
router.delete('/:id', checkLessonsAdmin, groupsController.deleteGroups);

module.exports = router;