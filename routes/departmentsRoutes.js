const express = require('express');
const router = express.Router();
const {getDepartments, addDepartments, updateDepartments, deleteDepartments} = require('../controllers/departmentController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, getDepartments);
router.post('/', checkLessonsAdmin, addDepartments);
router.put('/:id', checkLessonsAdmin, updateDepartments);
router.delete('/:id', checkLessonsAdmin, deleteDepartments);

module.exports = router;