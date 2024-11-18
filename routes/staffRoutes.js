const express = require('express');
const router = express.Router();
const {getStaff, addStaff, updateStaff, deleteStaff} = require('../controllers/staffController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getStaff);
router.post('/', checkAdmin, addStaff);
router.put('/:id', checkAdmin, updateStaff);
router.delete('/:id', checkAdmin, deleteStaff);

module.exports = router;