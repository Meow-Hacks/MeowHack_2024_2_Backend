const express = require('express');
const router = express.Router();
const branchesController = require('../controllers/branchController');
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkRoomsAdmin, branchesController.getBranch);
router.get('/:id', checkRoomsAdmin, branchesController.getBranchById);
router.post('/', checkRoomsAdmin, branchesController.addBranch);
router.put('/:id', checkRoomsAdmin, branchesController.updateBranch);
router.delete('/:id', checkRoomsAdmin, branchesController.deleteBranch);

module.exports = router;