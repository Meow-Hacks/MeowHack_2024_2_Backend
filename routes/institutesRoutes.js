const express = require('express');
const router = express.Router();
const institutesController = require('../controllers/instituteController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, institutesController.getInstitutes);
router.get('/:id', checkLessonsAdmin, institutesController.getInstituteById);
router.post('/', checkLessonsAdmin, institutesController.addInstitutes);
router.put('/:id', checkLessonsAdmin, institutesController.updateInstitutes);
router.delete('/:id', checkLessonsAdmin, institutesController.deleteInstitutes);

module.exports = router;