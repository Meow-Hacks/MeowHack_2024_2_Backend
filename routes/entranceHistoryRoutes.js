const express = require('express');
const router = express.Router();
const {
    getEntranceHistoryStudent,
    getEntranceHistoryTeacher,
    getEntranceHistoryAdmin,
    getEntranceHistoryStaff
} = require('../controllers/entranceHistoryController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/students', checkAdmin, getEntranceHistoryStudent);
router.get('/teachers', checkAdmin, getEntranceHistoryTeacher);
router.get('/admins', checkAdmin, getEntranceHistoryAdmin);
router.get('/staff', checkAdmin, getEntranceHistoryStaff);


module.exports = router;