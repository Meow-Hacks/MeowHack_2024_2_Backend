const express = require('express');
const router = express.Router();
const {getInstitutes, addInstitutes, updateInstitutes, deleteInstitutes} = require('../controllers/instituteController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getInstitutes);
router.post('/', checkAdmin, addInstitutes);
router.put('/:id', checkAdmin, updateInstitutes);
router.delete('/:id', checkAdmin, deleteInstitutes);

module.exports = router;