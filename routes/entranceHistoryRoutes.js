const express = require('express');
const router = express.Router();
const {
    getEntranceHistoryStudent,
    getEntranceHistoryTeacher,
    getEntranceHistoryAdmin,
    getEntranceHistoryStaff
} = require('../controllers/entranceHistoryController');
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/students', checkRoomsAdmin, getEntranceHistoryStudent);
router.get('/teachers', checkRoomsAdmin, getEntranceHistoryTeacher);
router.get('/admins', checkRoomsAdmin, getEntranceHistoryAdmin);
router.get('/staff', checkRoomsAdmin, getEntranceHistoryStaff);


module.exports = router;