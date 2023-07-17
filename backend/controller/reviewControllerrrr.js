

const Course = require("../model/course");
const User = require("../model/userModel");
const Review = require("../model/review"); 
const { isValidObjectId } = require('mongoose');


const createCourseReview = async (req, res, next) => {
  const { rating } = req.body;
  const { courseId, userId } = req.params;

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    const review = new Review({
      user: user._id,
      course: course._id,
      rating: Number(rating),
    });

    await review.save();

    res.status(201).json({ message: "Review added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourseReviews = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).select("rating");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const reviews = await Review.find({ course: courseId }).select("rating");
    const ratings = reviews.map((review) => review.rating);
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    res.json({ ratings, averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
  // Delete Review
  const deleteReview = async (req, res, next) => {
    const course = await Course.findById(req.query.courseId);
  
    if (!course) {
      return next(new ErrorHander("course not found", 404));
    }
  
    const reviews = course.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    await course.findByIdAndUpdate(
      req.query.courseId,
      {
        reviews,
   
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  };

  const getAllReviews = async (req, res, next) => {
    try {
      const reviews = await Review.find();
      res.status(200).json({ reviews });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const addCourseReview = async (req, res) => 
  {
  const { rating } = req.body;
  const { courseId, userId } = req.params;

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    const enrolledCourse = user.enrolledcourses.find(ec => ec.course.toString() === courseId);
    if (!enrolledCourse || !enrolledCourse.completed) {
      return res.status(400).json({ message: "You can only add a review for completed courses" });
    }
    const existingReview = await Review.findOne({ user: userId, course: courseId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already added a review for this course" });
    }

    const review = new Review({
      user: user._id,
      course: course._id,
      rating: Number(rating),
    });

    await review.save();

    res.status(201).json({ message: "Review added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
  
  
  exports.addCourseReview = addCourseReview;
  exports.getAllReviews = getAllReviews;
  exports.createCourseReview = createCourseReview;
exports.getCourseReviews = getCourseReviews;
exports.deleteReview = deleteReview;
