const express = require("express");
const router = express.Router();
const controller = require("../controllers/ProductFile");

router.get("/get/:id", controller.get);
module.exports = router;
