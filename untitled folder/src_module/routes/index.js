const express = require('express');
const router = express.Router();
// Import route modules
const tenantRoutes = require('../modules/tenant/tenantRoutes');
const institutionRoutes = require('../modules/institution/institutionRoutes');
const terminologyRoutes = require('../modules/terminologyRepo.js/terminologyRoutes');
const moduleRoutes = require('../modules/module/moduleRoutes');
const userRoutes = require('../modules/users/userRoutes');
// const roleRoutes = require('../modules/roles/roleRoutes');
const tosRoutes = require('../modules/tos/tosRoutes');

// Mount route modules
router.use('/tenant', tenantRoutes);
router.use('/institution', institutionRoutes);
router.use('/terminology', terminologyRoutes);
router.use('/module', moduleRoutes);
router.use('/users', userRoutes);
// router.use('/roles', roleRoutes);
router.use('/tos', tosRoutes);


module.exports = router;

