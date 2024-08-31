const express = require("express");
const router = express.Router();
const controller = require("../controllers/Product");
const { upload } = require("../middleware/middleware");

router.get("/get/?id", controller.get);
router.get("/get", controller.get);
router.post("/create", [upload.single("picture")], controller.create);
router.patch("/update", [upload.single("picture")], controller.update);
router.delete("/delete/:id", controller.delete);

module.exports = router;
