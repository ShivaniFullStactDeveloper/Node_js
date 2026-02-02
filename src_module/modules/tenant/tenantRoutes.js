// src/modules/setup/tenant/tenantRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('./tenantController');

router.post('/', controller.createTenant);
router.get('/:id', controller.getTenantById);

module.exports = router;
