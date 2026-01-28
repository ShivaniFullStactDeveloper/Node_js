const express = require('express');
const router = express.Router();

const setupRoutes = require('../modules/setup/setupRoutes');

router.use('/setup', setupRoutes);

module.exports = router;
