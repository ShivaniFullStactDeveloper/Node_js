const express = require('express');
const router = express.Router();
const controller = require('./invoiceController');

router.post('/generate', controller.generateInvoice);

module.exports = router;
