const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");
const upload = require("../middleware/multer");

router.get("/", courseController.getAllCourses);
router.post(
  "/:userId/:courseId/wishlist",
  courseController.addCourseToWishList
);
router.delete(
  "/:userId/:courseId/removeFromWishlist",
  courseController.removeFromWishlist
);
router.get("/:id", courseController.getById);
router.post(
  "/addCourse/:instructorId",
  upload.single("file"),
  courseController.addCourse
);
router.delete("/:id", courseController.deleteCourse);
router.put("/:id", courseController.updateCourse);
router.post(
  "/addCourseToUser/:userId/courses/:courseId",
  courseController.addCourseToUser
);
router.get("/:courseId/students", courseController.getUserOfCourse);
router.get("/search/:query", courseController.searchCourses);
router.get(
  "/searchByCategory/:category",
  courseController.searchCoursesByCategory
);
router.get("/most/popular", courseController.getCoursePopularity);
router.get("/filter/price", courseController.filterCoursesByPrice);

router.post("/:id/reviews/:userId", courseController.createCoureReview);
router.get("/:id/reviews", courseController.getCourseReviews);
router.delete("/:id/reviews", courseController.deleteReview);
router.put(
  "/updateProgress/:userId/:courseId",
  courseController.updateProgress
);
router.get("/getCourse/:instructorId", courseController.getCourseByInstructor);

router.get("/:courseId/content", courseController.getCourseContent);
router.get("/getenrolledcourses/:userId", courseController.getEnrolledCourses);
router.get("/similarcourses/:courseId", courseController.similarCourses);
router.get("/youtubevideoet/courses", courseController.youtubevideo);
router.get("/getWishList/:userId", courseController.getWishList);
router.get("/isInWishList/:userId/:courseId", courseController.isInWishList);
router.get("/courseProgress/:userId/:courseId", courseController.getCourseProgress)
router.get('/:userId/courses/predict', courseController.predictCourses);
router.get('/getbyname/:name', courseController.getIdCourseByCourseName);

module.exports = router;
