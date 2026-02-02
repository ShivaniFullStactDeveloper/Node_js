const express = require('express');
const router = express.Router();
const controller = require('./subscriptionController');

router.post('/activate', controller.activateSubscription);

module.exports = router;
