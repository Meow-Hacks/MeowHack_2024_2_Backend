const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {checkAllAdmin} = require('../middleware/checkAdmin');

router.get('/', checkAllAdmin, adminController.getAdmins);
router.get('/:id', checkAllAdmin, adminController.getAdminById);
router.post('/', checkAllAdmin, adminController.addAdmins);
router.put('/:id', checkAllAdmin, adminController.updateAdmins);
router.delete('/:id', checkAllAdmin, adminController.deleteAdmins);

module.exports = router;