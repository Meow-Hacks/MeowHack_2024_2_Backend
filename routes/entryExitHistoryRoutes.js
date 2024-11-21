const express = require('express');
const router = express.Router();
const {
    getEntryExitHistoryStudent,
    getEntryExitHistoryTeacher,
    getEntryExitHistoryAdmin,
    getEntryExitHistoryStaff
} = require('../controllers/entryExitHistoryController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/students', checkAdmin, getEntryExitHistoryStudent());
router.get('/teachers', checkAdmin, getEntryExitHistoryTeacher());
router.get('/admins', checkAdmin, getEntryExitHistoryAdmin());
router.get('/staff', checkAdmin, getEntryExitHistoryStaff());


module.exports = router;