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
const checkAdmin = require('../middleware/checkAdmin');

router.get('/teacher-auditory/:id', checkAdmin, getAuditoryAccessesHistoryTeachersId());
router.get('/auditory-teacher/:id', checkAdmin, getAuditoryIdAccessesHistoryTeachers());
router.get('/admin-auditory/:id', checkAdmin, getAuditoryAccessesHistoryAdminsId());
router.get('/auditory-admin/:id', checkAdmin, getAuditoryIdAccessesHistoryAdmins());
router.get('/staff-auditory/:id', checkAdmin, getAuditoryAccessesHistoryStaffId());
router.get('/auditory-staff/:id', checkAdmin, getAuditoryIdAccessesHistoryStaff());

module.exports = router;