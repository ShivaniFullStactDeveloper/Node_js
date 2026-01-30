const express = require('express');
const router = express.Router();
// Import route modules
const setupRoutes = require('../modules/setup/setupRoutes');
const institutionRoutes = require('../modules/institution/institutionRoutes');
const terminologyRoutes = require('../modules/terminology/terminologyRoutes');
const tosRoutes = require('../modules/tos/tosRoutes');

// Mount route modules
router.use('/setup', setupRoutes);
router.use('/institution', institutionRoutes);
router.use('/terminology', terminologyRoutes);
router.use('/tos', tosRoutes);

module.exports = router;
