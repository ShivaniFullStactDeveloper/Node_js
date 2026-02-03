
const express = require('express');
const router = express.Router();
const controller = require('./userController');

// SUPER ADMIN only
router.post('/', controller.createUser);

module.exports = router;
