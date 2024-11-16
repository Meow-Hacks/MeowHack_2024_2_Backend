const express = require('express');
const router = express.Router();
const {getAuditories, addAuditories, updateAuditories, deleteAuditories} = require('../controllers/auditories');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getAuditories);
router.post('/', checkAdmin, addAuditories);
router.put('/:id', checkAdmin, updateAuditories);
router.delete('/:id', checkAdmin, deleteAuditories);

module.exports = router;