const express = require('express');
const router = express.Router();
// Import route modules
const institutionRoutes = require('../setup/institution/institutionRoutes');
const tosRoutes = require('../setup/tos/tosRoutes')
const locationRoutes = require('../setup/location/locationRoutes')
const modulesRoutes = require('../setup/modules/moduleRoutes')

// Mount route modules
router.use('/institution', institutionRoutes);
router.use('/tos/', tosRoutes)
router.use('/location' , locationRoutes)
router.use('/modules' , modulesRoutes)

module.exports = router;

