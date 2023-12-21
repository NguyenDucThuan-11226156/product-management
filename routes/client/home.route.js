const express = require("express");
const router = express.Router();
const controler = require("../../controllers/client/home.controller");
router.get("/", controler.index);
module.exports = router;
