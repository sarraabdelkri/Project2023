const express = require("express");
const router = express.Router();
const contract = require("../model/Contract");
const contractController = require("../controller/contract-controller");


router.get("/getAllContracts", contractController.getAllContracts);
router.post("/contracts/:userId/:jobId", contractController.addContract);
// router.post("/contracts/:userId/:postId", contractController.addContract);
router.get('/contracts/user/:userName/title/:postTitle', contractController.getByNameAndTitle);
router.get("/:id", contractController.getById);
router.put("/contracts/:id/status", contractController.updateContract);
router.delete("/contracts/:id", contractController.deleteContract);

module.exports = router;
