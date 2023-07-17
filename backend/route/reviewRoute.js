
const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewControllerrrr");

router.post("/:courseId/reviews/:userId", reviewController.createCourseReview);
router.post("/users/:courseId/courses/:userId/reviews", reviewController.addCourseReview);
router.get("/:id/reviews", reviewController.getCourseReviews);
router.delete("/:id/reviews", reviewController.deleteReview);
router.get("/", reviewController.getAllReviews);
module.exports = router;
