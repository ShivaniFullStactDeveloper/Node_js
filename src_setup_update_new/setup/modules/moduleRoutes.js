const router = require("express").Router();
const controller = require("./moduleController");

// Create module with institute configuration
router.post("/create", controller.createModule);

// Get modules for institution setup (enabled + disabled)
router.get("/", controller.getModulesForInstitution);

// Get only enable modules for institution
router.get("/enabled", controller.getEnabledModules);

// Enable or disable module for institution
router.post("/assign", controller.assignModules);

// Create permissions under a module
router.post("/permissions", controller.createModulePermissions);




module.exports = router;
