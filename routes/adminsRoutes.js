const express = require('express');
const router = express.Router();
const {getAdmins, addAdmins, updateAdmins, deleteAdmins} = require('../controllers/adminController');
const {checkAllAdmin} = require('../middleware/checkAdmin');

router.get('/', checkAllAdmin, getAdmins);
router.post('/', checkAllAdmin, addAdmins);
router.put('/:id', checkAllAdmin, updateAdmins);
router.delete('/:id', checkAllAdmin, deleteAdmins);

module.exports = router;