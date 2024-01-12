const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller");
router.get("/", controller.index);
router.get("/detail", controller.detail);
router.get("/edit", controller.edit);
router.get("/create", controller.create);
router.get("/:slug", controller.detail);
module.exports = router;
