const express = require('express');
const router = express.Router();
const entranceHistoryController = require('../controllers/entranceHistoryController');
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/students', checkRoomsAdmin, entranceHistoryController.getEntranceHistoryStudent);
router.get('/teachers', checkRoomsAdmin, entranceHistoryController.getEntranceHistoryTeacher);
router.get('/admins', checkRoomsAdmin, entranceHistoryController.getEntranceHistoryAdmin);
router.get('/staff', checkRoomsAdmin, entranceHistoryController.getEntranceHistoryStaff);


module.exports = router;