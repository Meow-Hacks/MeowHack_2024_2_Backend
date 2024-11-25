const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departmentController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, departmentsController.getDepartments);
router.get('/:id', checkLessonsAdmin, departmentsController.getDepartmentById);
router.post('/', checkLessonsAdmin, departmentsController.addDepartments);
router.put('/:id', checkLessonsAdmin, departmentsController.updateDepartments);
router.delete('/:id', checkLessonsAdmin, departmentsController.deleteDepartments);

module.exports = router;