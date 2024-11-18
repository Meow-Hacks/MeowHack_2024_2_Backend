const express = require('express');
const router = express.Router();
const {getBranch, addBranch, updateBranch, deleteBranch} = require('../controllers/branchController');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/', checkAdmin, getBranch);
router.post('/', checkAdmin, addBranch);
router.put('/:id', checkAdmin, updateBranch);
router.delete('/:id', checkAdmin, deleteBranch);

module.exports = router;