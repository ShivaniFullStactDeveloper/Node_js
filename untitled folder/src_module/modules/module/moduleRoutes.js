// src/module/modules/moduleRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('./moduleController');

router.post('/', controller.createModule);
router.post('/institute-type', controller.assignInstituteType);
router.post('/assign', controller.assignToInstitution);

router.get(
  '/institution/:institutionId',
  controller.getInstitutionModules
);

router.post('/toggle', controller.toggleModule);

router.post('/permission', controller.addPermission);
router.get('/permission/:moduleKey', controller.getPermissions);

module.exports = router;
