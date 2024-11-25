const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const {checkAllAdmin} = require('../middleware/checkAdmin');

router.get('/', checkAllAdmin, staffController.getStaff);
router.get('/:id', checkAllAdmin, staffController.getStaffById);
router.post('/', checkAllAdmin, staffController.addStaff);
router.put('/:id', checkAllAdmin, staffController.updateStaff);
router.delete('/:id', checkAllAdmin, staffController.deleteStaff);

module.exports = router;