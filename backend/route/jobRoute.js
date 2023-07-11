const express = require("express");
const router = express.Router();
const jobController= require('../controller/jobController')
const { auth } = require("../middleware/auth");

router.get("/getalljobs", jobController.getAllJobs);
router.post("/addjob",auth , jobController.addJob);
router.get("/:id",jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;