const express = require('express');
const router = express.Router();
const accessHistoryController = require('../controllers/accessHistoryController');
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/teacher-auditory/:id', checkRoomsAdmin, accessHistoryController.getAuditoryAccessesHistoryTeachersId);
router.get('/auditory-teacher/:id', checkRoomsAdmin, accessHistoryController.getAuditoryIdAccessesHistoryTeachers);
router.get('/admin-auditory/:id', checkRoomsAdmin, accessHistoryController.getAuditoryAccessesHistoryAdminsId);
router.get('/auditory-admin/:id', checkRoomsAdmin, accessHistoryController.getAuditoryIdAccessesHistoryAdmins);
router.get('/staff-auditory/:id', checkRoomsAdmin, accessHistoryController.getAuditoryAccessesHistoryStaffId);
router.get('/auditory-staff/:id', checkRoomsAdmin, accessHistoryController.getAuditoryIdAccessesHistoryStaff);

module.exports = router;