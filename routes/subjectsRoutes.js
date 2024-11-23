const express = require('express');
const router = express.Router();
const {getSubjects, addSubject, updateSubject, deleteSubject} = require('../controllers/subjectsController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getSubjects);
router.post('/', checkAdmin, addSubject);
router.put('/:id', checkAdmin, updateSubject);
router.delete('/:id', checkAdmin, deleteSubject);

module.exports = router;