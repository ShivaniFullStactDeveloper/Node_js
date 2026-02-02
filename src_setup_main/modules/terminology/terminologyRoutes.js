const express = require('express');
const router = express.Router();
const controller = require('./terminologyController');

router.post('/load-default', controller.loadDefaults);
router.get('/:institutionId/terminology', controller.getInstitutionTerminology);

module.exports = router;
