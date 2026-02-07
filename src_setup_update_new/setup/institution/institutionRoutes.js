const router = require("express").Router();
const controller = require("./institutionController");

router.post("/setup", controller.setupInstitution);

module.exports = router;
