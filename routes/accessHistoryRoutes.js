const express = require('express');
const router = express.Router();
const {
    getAuditoryAccessesHistoryTeachersId,
    getAuditoryAccessesHistoryAdminsId,
    getAuditoryAccessesHistoryStaffId,
    getAuditoryIdAccessesHistoryTeachers,
    getAuditoryIdAccessesHistoryAdmins,
    getAuditoryIdAccessesHistoryStaff
} = require('../controllers/accessHistoryController');
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/teacher-auditory/:id', checkRoomsAdmin, getAuditoryAccessesHistoryTeachersId);
router.get('/auditory-teacher/:id', checkRoomsAdmin, getAuditoryIdAccessesHistoryTeachers);
router.get('/admin-auditory/:id', checkRoomsAdmin, getAuditoryAccessesHistoryAdminsId);
router.get('/auditory-admin/:id', checkRoomsAdmin, getAuditoryIdAccessesHistoryAdmins);
router.get('/staff-auditory/:id', checkRoomsAdmin, getAuditoryAccessesHistoryStaffId);
router.get('/auditory-staff/:id', checkRoomsAdmin, getAuditoryIdAccessesHistoryStaff);

module.exports = router;