const express = require("express");
const router = express.Router();

const article = require("../controller/atelierController");


router.post("/addarticle", article.addAtelier);
router.get("/getallarticle", article.getAllAtelier);
module.exports = router;