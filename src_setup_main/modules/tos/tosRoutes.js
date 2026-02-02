const router = require('express').Router();
const controller = require('./tosController');

router.post('/accept', controller.acceptTos);

module.exports = router;
