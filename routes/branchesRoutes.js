const express = require('express');
const router = express.Router();
const {getBranch, addBranch, updateBranch, deleteBranch} = require('../controllers/branchController');
const {checkRoomsAdmin} = require('../middleware/checkAdmin');

router.get('/', checkRoomsAdmin, getBranch);
router.post('/', checkRoomsAdmin, addBranch);
router.put('/:id', checkRoomsAdmin, updateBranch);
router.delete('/:id', checkRoomsAdmin, deleteBranch);

module.exports = router;