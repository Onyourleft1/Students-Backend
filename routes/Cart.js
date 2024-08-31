const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cart");

// router.get("/get", controller.get);
router.get("/get/?id", controller.get);
router.get("/get", controller.get);
router.post("/addToCart", controller.addToCart);
router.patch("/update", controller.update);
router.delete("/removeFromCart/:id", controller.removeFromCart);

module.exports = router;
