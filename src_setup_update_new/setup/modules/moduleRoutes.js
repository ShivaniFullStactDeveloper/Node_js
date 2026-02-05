const router = require("express").Router();
const controller = require("./moduleController");

// Admin – create module
router.post("/create", controller.createModule);

// STEP-4 screen – get modules for institution
router.get("/", controller.getModulesForInstitution);

// STEP-4 save – enable / disable
// router.post("/assign", controller.assignModules);

module.exports = router;
