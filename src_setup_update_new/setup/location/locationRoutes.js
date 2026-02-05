const router = require("express").Router();
const controller = require("./locationController");

router.post("/", controller.saveLocation);

module.exports = router;
