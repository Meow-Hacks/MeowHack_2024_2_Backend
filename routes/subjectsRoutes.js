const express = require('express');
const router = express.Router();
const subjectsController = require('../controllers/subjectsController');
const {checkLessonsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkLessonsAdmin, subjectsController.getSubjects);
router.get('/:id', checkLessonsAdmin, subjectsController.getSubjectById);
router.post('/', checkLessonsAdmin, subjectsController.addSubject);
router.put('/:id', checkLessonsAdmin, subjectsController.updateSubject);
router.delete('/:id', checkLessonsAdmin, subjectsController.deleteSubject);

module.exports = router;