const express = require('express');
const router = express.Router();
const {getInstitutes, addInstitutes, updateInstitutes, deleteInstitutes} = require('../controllers/instituteController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, getInstitutes);
router.post('/', checkLessonsAdmin, addInstitutes);
router.put('/:id', checkLessonsAdmin, updateInstitutes);
router.delete('/:id', checkLessonsAdmin, deleteInstitutes);

module.exports = router;