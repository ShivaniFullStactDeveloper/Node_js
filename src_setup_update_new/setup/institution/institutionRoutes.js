const router = require("express").Router();
const controller = require("./institutionController");

router.post("/", controller.setupInstitution);

module.exports = router;
