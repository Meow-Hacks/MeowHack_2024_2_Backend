const express = require('express');
const router = express.Router();
const {getAdmins, addAdmins, updateAdmins, deleteAdmins} = require('../controllers/adminController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getAdmins);
router.post('/', checkAdmin, addAdmins);
router.put('/:id', checkAdmin, updateAdmins);
router.delete('/:id', checkAdmin, deleteAdmins);

module.exports = router;