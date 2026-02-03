// src/module/terminology/terminologyRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('./terminologyController');

router.post('/seed', controller.seedTerminology); 
router.get('/', controller.getTerminology);    

module.exports = router;
