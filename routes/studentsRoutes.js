const express = require('express');
const router = express.Router();
const {getStudents, addStudents, updateStudents, deleteStudent} = require('../controllers/studentController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getStudents);
router.post('/', checkAdmin, addStudents);
router.put('/:id', checkAdmin, updateStudents);
router.delete('/:id', checkAdmin, deleteStudent);

module.exports = router;