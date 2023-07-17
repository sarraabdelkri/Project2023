const express = require("express");
const router = express.Router();
const jobScrapeController = require('../controller/jobScrapeController')


router.get("/li", jobScrapeController.linkedin);
router.get("/wttj", jobScrapeController.wttj);
// router.get("/", jobScrapeController.all);


module.exports = router;