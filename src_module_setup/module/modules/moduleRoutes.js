/**
 * Routes file
 * Frontend yahi hit karega
 */

const express = require("express");
const router = express.Router();
const controller = require("./moduleController");

// S4 – Create system module (SchoolCore backend)
router.post("/create", controller.createModule);

// S5 – Assign default modules to institute type
router.post("/defaults", controller.assignDefaults);

// S6 – Get default modules for institute type
router.get("/defaults/:institution_type", controller.getDefaults);

// S7 – Apply defaults to institution (during setup)
router.post("/apply-to-institution", controller.applyDefaultsToInstitution);

// S8 – Enable / Disable module (if not locked)
router.patch("/toggle", controller.toggleModule);

module.exports = router;
