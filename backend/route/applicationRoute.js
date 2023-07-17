const express = require("express");
const router = express.Router();
const applicationController= require('../controller/applicationController')
const { auth } = require("../middleware/auth");


router.post("/apply/:jobId",auth , applicationController.createApplication);
router.get("/:jobId" , applicationController.getApplicationsByJobId);
router.get("/:userId",auth, applicationController.getApplicationsByStudentId);
router.get("/", applicationController.getallapplications);
router.delete("/:applicationId", applicationController.deleteApplication);


module.exports = router;