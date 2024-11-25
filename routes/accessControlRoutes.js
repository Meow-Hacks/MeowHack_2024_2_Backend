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
router.put('/update-access-teacher/:id', checkRoomsAdmin, accessControlController.updateTeacherAccessById);
router.delete('/delete-access-teacher/:id', checkRoomsAdmin, accessControlController.deleteTeacherAccessById);
router.post('/grant-access-admin', checkRoomsAdmin, accessControlController.grantAccessByAdminId);
router.put('/update-access-admin/:id', checkRoomsAdmin, accessControlController.updateAdminAccessById);
router.delete('/delete-access-admin/:id', checkRoomsAdmin, accessControlController.deleteAdminAccessById);
router.post('/grant-access-staff', checkRoomsAdmin, accessControlController.grantAccessByStaffId);
router.put('/update-access-staff/:id', checkRoomsAdmin, accessControlController.updateStaffAccessById);
router.delete('/delete-access-staff/:id', checkRoomsAdmin, accessControlController.deleteStaffAccessById);

module.exports = router;