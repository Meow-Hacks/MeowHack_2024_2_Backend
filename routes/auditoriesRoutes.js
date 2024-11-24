const express = require('express');
const router = express.Router();
const {getAuditories, addAuditories, updateAuditories, deleteAuditories} = require('../controllers/auditoryController');
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkRoomsAdmin, getAuditories);
router.post('/', checkRoomsAdmin, addAuditories);
router.put('/:id', checkRoomsAdmin, updateAuditories);
router.delete('/:id', checkRoomsAdmin, deleteAuditories);

module.exports = router;