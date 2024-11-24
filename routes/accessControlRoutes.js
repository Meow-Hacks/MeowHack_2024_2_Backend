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
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/teacher-auditory/:id', checkRoomsAdmin, getAuditoryAccessesTeachersId);
router.get('/auditory-teacher/:id', checkRoomsAdmin, getAuditoryIdAccessesTeachers);
router.get('/admin-auditory/:id', checkRoomsAdmin, getAuditoryAccessesAdminsId);
router.get('/auditory-admin/:id', checkRoomsAdmin, getAuditoryIdAccessesAdmins);
router.get('/staff-auditory/:id', checkRoomsAdmin, getAuditoryAccessesStaffId);
router.get('/auditory-staff/:id', checkRoomsAdmin, getAuditoryIdAccessesStaff);

module.exports = router;