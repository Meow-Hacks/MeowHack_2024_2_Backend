const express = require('express');
const router = express.Router();
const enterTokenController = require('../controllers/enterTokenController');
const {checkAdmin} = require('../middleware/checkAdmin');

router.post('/', checkAdmin, enterTokenController.generateEnterToken);

module.exports = router;