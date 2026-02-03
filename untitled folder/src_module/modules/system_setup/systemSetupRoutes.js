// // src/module/systemSetup/systemSetupRoutes.js
// const express = require('express');
// const router = express.Router();
// const controller = require('./systemSetupController');

// router.post('/first-super-admin', controller.createFirstSuperAdmin);

// module.exports = router;


const express = require('express');
const router = express.Router();

const controller = require('./systemSetupController');

router.post('/first-super-admin', controller.createFirstSuperAdmin);

module.exports = router;
