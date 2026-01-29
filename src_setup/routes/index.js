const express = require('express');
const router = express.Router();
// Import route modules
const setupRoutes = require('../modules/setup/setupRoutes');
const institutionRoutes = require('../modules/institution/institutionRoutes');

// Mount route modules
router.use('/setup', setupRoutes);
router.use('/institution', institutionRoutes);

module.exports = router;
