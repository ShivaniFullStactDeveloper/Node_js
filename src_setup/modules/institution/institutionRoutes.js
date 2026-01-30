const express = require('express');
const router = express.Router();
const controller = require('./institutionController');

router.post('/', controller.createInstitution);
router.post('/domain', controller.addInstitutionDomain);
router.post('/domain/verify', controller.verifyInstitutionDomain);
router.get('/:institutionId/modules',controller.getInstitutionModules);
  


module.exports = router;
