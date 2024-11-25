const express = require('express');
const router = express.Router();
const auditoryController = require('../controllers/auditoryController');
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkRoomsAdmin, auditoryController.getAuditories);
router.get('/:id', checkRoomsAdmin, auditoryController.getAuditoryById);
router.post('/', checkRoomsAdmin, auditoryController.addAuditories);
router.put('/:id', checkRoomsAdmin, auditoryController.updateAuditories);
router.delete('/:id', checkRoomsAdmin, auditoryController.deleteAuditories);

module.exports = router;