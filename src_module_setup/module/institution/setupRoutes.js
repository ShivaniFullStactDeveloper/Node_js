const express = require("express");
const router = express.Router();
const controller = require("./setupController");

router.post('/', controller.createTenant);
router.get('/:id', controller.getTenantById);