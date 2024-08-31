const express = require("express");
const router = express.Router();
const controller = require("../controllers/UserFile");

router.get("/get/:id", controller.get);
module.exports = router;
