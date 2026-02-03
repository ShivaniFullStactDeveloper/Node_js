
// const express = require('express');
// const router = express.Router();
// const controller = require('./tosController');

// router.post('/', controller.createTos);          // create
// router.get('/active', controller.getActiveTos);  // get
// router.post('/accept', controller.acceptTos);    // accept

// module.exports = router;


// src/module/tos/tosRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('./tosController');

router.get('/active', controller.getActiveTOS);
router.post('/accept', controller.acceptTOS);

module.exports = router;
