const express = require('express');
const router = express.Router();
const {generateEnterToken} = require('../controllers/enterTokenController');
const checkAdmin = require('../middleware/checkAdmin');

router.post('/', checkAdmin, generateEnterToken);

module.exports = router;