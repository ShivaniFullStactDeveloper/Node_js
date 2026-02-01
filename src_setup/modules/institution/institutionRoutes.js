const express = require('express');
const router = express.Router();
const controller = require('./institutionController');

router.post('/institution', controller.createInstitution);

module.exports = router;
