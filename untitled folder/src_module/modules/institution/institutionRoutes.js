
const express = require('express');
const router = express.Router();
const controller = require('./institutionController');

router.post('/', controller.createInstitution);

module.exports = router;
