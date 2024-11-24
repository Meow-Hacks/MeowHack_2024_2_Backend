const express = require('express');
const router = express.Router();
const {getStaff, addStaff, updateStaff, deleteStaff} = require('../controllers/staffController');
const {checkAllAdmin} = require('../middleware/checkAdmin');

router.get('/', checkAllAdmin, getStaff);
router.post('/', checkAllAdmin, addStaff);
router.put('/:id', checkAllAdmin, updateStaff);
router.delete('/:id', checkAllAdmin, deleteStaff);

module.exports = router;