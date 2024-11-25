const express = require('express');
const router = express.Router();
const accessControlController = require('../controllers/accessControlController');
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/teacher-auditory/:id', checkRoomsAdmin, accessControlController.getAuditoryAccessesTeachersId);
router.get('/auditory-teacher/:id', checkRoomsAdmin, accessControlController.getAuditoryIdAccessesTeachers);
router.get('/admin-auditory/:id', checkRoomsAdmin, accessControlController.getAuditoryAccessesAdminsId);
router.get('/auditory-admin/:id', checkRoomsAdmin, accessControlController.getAuditoryIdAccessesAdmins);
router.get('/staff-auditory/:id', checkRoomsAdmin, accessControlController.getAuditoryAccessesStaffId);
router.get('/auditory-staff/:id', checkRoomsAdmin, accessControlController.getAuditoryIdAccessesStaff);
router.post('/grant-access-teacher', checkRoomsAdmin, accessControlController.grantAccessByTeacherId);
router.post('/grant-access-admin', checkRoomsAdmin, accessControlController.grantAccessByAdminId);
router.post('/grant-access-staff', checkRoomsAdmin, accessControlController.grantAccessByStaffId);

module.exports = router;