const router = require("express").Router();
const controller = require("./tosController");

router.post("/", controller.createTos);
router.get("/active", controller.getActiveTos);
router.post("/accept", controller.acceptTos);

module.exports = router;
