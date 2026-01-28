const express = require('express');
const router = express.Router();
const controller = require('./setupController');

router.post('/tenant', controller.createTenant);
router.post('/institution', controller.createInstitution);
router.post('/onboarding/start', controller.startOnboarding);

module.exports = router;
