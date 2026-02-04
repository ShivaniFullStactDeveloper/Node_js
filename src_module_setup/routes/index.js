const express = require("express");
const router = express.Router();

const moduleRoutes = require("../module/modules/moduleRoutes");

router.use("/module", moduleRoutes);

module.exports = router;
