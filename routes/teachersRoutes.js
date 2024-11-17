const express = require('express');
const router = express.Router();
const {getTeachers, addTeachers, updateTeachers, deleteTeachers} = require('../controllers/teachers');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getTeachers);
router.post('/', checkAdmin, addTeachers);
router.put('/:id', checkAdmin, updateTeachers);
router.delete('/:id', checkAdmin, deleteTeachers);

module.exports = router;