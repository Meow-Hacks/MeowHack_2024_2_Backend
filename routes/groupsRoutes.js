const express = require('express');
const router = express.Router();
const {getGroups, addGroups, updateGroups, deleteGroups} = require('../controllers/groupController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getGroups);
router.post('/', checkAdmin, addGroups);
router.put('/:id', checkAdmin, updateGroups);
router.delete('/:id', checkAdmin, deleteGroups);

module.exports = router;