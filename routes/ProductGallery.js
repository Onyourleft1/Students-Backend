const express = require("express");
const router = express.Router();
const controller = require("../controllers/ProductGallery");
const { uploadG } = require("../middleware/middleware");

router.get("/get/:id", controller.get);
router.post("/create", [uploadG.array("gallery", 100)], controller.create);
router.delete("/delete/:id", controller.delete);
module.exports = router;
