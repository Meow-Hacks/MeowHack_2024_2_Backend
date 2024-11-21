const express = require('express');
const router = express.Router();
const {
    getAuditoryAccessesTeachersId,
    getAuditoryAccessesAdminsId,
    getAuditoryAccessesStaffId,
    getAuditoryIdAccessesTeachers,
    getAuditoryIdAccessesAdmins,
    getAuditoryIdAccessesStaff
} = require('../controllers/accessControlController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/teacher-auditory/:id', checkAdmin, getAuditoryAccessesTeachersId());
router.get('/auditory-teacher/:id', checkAdmin, getAuditoryIdAccessesTeachers());
router.get('/admin-auditory/:id', checkAdmin, getAuditoryAccessesAdminsId());
router.get('/auditory-admin/:id', checkAdmin, getAuditoryIdAccessesAdmins());
router.get('/staff-auditory/:id', checkAdmin, getAuditoryAccessesStaffId());
router.get('/auditory-staff/:id', checkAdmin, getAuditoryIdAccessesStaff());

module.exports = router;