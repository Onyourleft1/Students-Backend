const express = require("express");
const router = express.Router();
const controller = require("../controllers/User");
const { upload } = require("../middleware/middleware");

router.get("/get", controller.get);
router.post("/create", [upload.single("picture")], controller.create);
router.patch("/update", controller.update);
router.delete("/delete/:id", controller.delete);
router.post("/login", controller.login);
router.post("/getLoginInfo", controller.getLoginInfo);
router.get("/logout", controller.logout);

module.exports = router;
