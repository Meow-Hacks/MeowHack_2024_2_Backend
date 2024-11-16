const express = require('express');
const router = express.Router();
const {getDepartments, addDepartments, updateDepartments, deleteDepartments} = require('../controllers/departments');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getDepartments);
router.post('/', checkAdmin, addDepartments);
router.put('/:id', checkAdmin, updateDepartments);
router.delete('/:id', checkAdmin, deleteDepartments);

module.exports = router;