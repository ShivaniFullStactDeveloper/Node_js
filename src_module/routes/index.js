const express = require('express');
const router = express.Router();
// Import route modules
const tenantRoutes = require('../modules/tenant/tenantRoutes');

// Mount route modules
router.use('/tenant', tenantRoutes);



module.exports = router;
