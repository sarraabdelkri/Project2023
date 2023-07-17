const Course = require("../model/course");
const User = require("../model/userModel");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const apiKey = "AIzaSyBRJiSgAUjrkZChkWo9UqyXAO_PxeC96Os";
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const axios = require("axios");

//const google = require("googleapis");
//const youtube = google.youtube({ version: "v3", auth: apiKey });
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "expertiseshaper@gmail.com",
    pass: "jhuosyrjxednxvcf",
  },
});
//nbr de tentatives 3 => not free
const youtubevideo = async (req, res, next) => {
  const searchQuery = req.query.search_query;
  try {
    const url = `${baseApiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;
    const response = await axios.get(url);

    const videos = response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      description: item.snippet.description,
    }));

    res.send(videos);
  } catch (error) {
    next(error);
  }
};

//get all courses
const getAllCourses = async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find();
  } catch (err) {
    console.log(err);
  }
  if (!courses) {
    return res.status(404).json({ message: "No courses found" });
  } else {
    return res.status(200).json({ courses });
  }
};
//add course
const addCourse = async (req, res, next) => {
  const { name, description, category, duration, startdate, enddate, price } =
    req.body;
  const file = req.file;
  const instructorId = req.params.instructorId;

  const instructor = await User.findOne({
    _id: instructorId,
    role: "instructor",
  });
  if (!instructor) {
    return res.status(400).send("Instructor not found");
  }
  if (!file) {
    return res.status(400).send("Please upload a file");
  }
  const course = new Course({
    name,
    description,
    category,
    duration,
    startdate,
    enddate,
    price,
    content: {
      data: file.buffer,
      contentType: file.mimetype,
      fileName: name,
    },
    instructor: instructor,
  });
  try {
    instructor.postedCourses.push({ course: course._id });
    await instructor.save();
    await course.save();
    res.status(201).send(course);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

//delete course
const deleteCourse = async (req, res, next) => {
  const id = req.params.id;
  let course;
  try {
    course = await Course.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!course) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Course Successfully Deleted" });
};
//update course
const updateCourse = async (req, res, next) => {
  const id = req.params.id;
  const { name, description, category, duration, startdate, enddate, price } =
    req.body;
  let course;
  try {
    course = await Course.findByIdAndUpdate(id, {
      name,
      description,
      category,
      duration,
      startdate,
      enddate,
      price,
    });
    course = await course.save();
  } catch (err) {
    console.log(err);
  }
  if (!course) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ course });
};
// get course by id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let course;
  try {
    course = await Course.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!course) {
    return res.status(404).json({ message: "No Course found" });
  }
  return res.status(200).json({ course });
};

//enroll course
const addCourseToUser = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);
    // Create a course product and its price
    stripe.products.create(
      {
        name: course.name,
        description: course.description,
        type: "service",
        attributes: [course.duration, course.startdate],
        metadata: {
          course_id: course._id,
          author: course.instructor,
        },
      },
      function (err, product) {
        if (err) {
          console.error(err);
        } else {
          console.log(product);
          // Create a price for the product
          stripe.prices.create(
            {
              product: product.id,
              unit_amount: Math.round((course.price* 0.36)*100),
              currency: "usd",
              metadata: {
                course_id: course._id,
              },
            },
            function (err, price) {
              if (err) {
                console.error(err);
              } else {
                console.log(price);
                //create a customer
                const customerParam = {
                  email: user.email,
                  name: user.name,
                  description: "customer from node",
                };

                stripe.customers.create(
                  customerParam,
                  function (err, customer) {
                    if (err) {
                      console.log("err in creating customer" + err);
                    }
                    if (customer) {
                      console.log("customer created successfuly" + customer);
                      //create token
                      const cardParam = {};
                      cardParam.card = {
                        number: "4242424242424242",
                        exp_month: 2,
                        exp_year: 2024,
                        cvc: "212",
                      };
                      stripe.tokens.create(cardParam, function (err, token) {
                        if (err) {
                          console.log("err" + err);
                        }
                        if (token) {
                          console.log(
                            "success" + JSON.stringify(token, null, 2)
                          );
                          //create customer card
                          stripe.customers.createSource(
                            customer.id,
                            { source: token.id },
                            function (err, card) {
                              if (err) {
                                console.log("err" + err);
                              }
                              if (card) {
                                console.log(
                                  "success" + JSON.stringify(card, null, 2)
                                );
                                //charging with customer id
                                const customerParam = {
                                  amount: course.price,
                                  currency: "usd",
                                  description: "payment",
                                  customer: customer.id,
                                };
                                stripe.charges.create(
                                  customerParam,
                                  function (err, charge) {
                                    if (err) {
                                      console.log("err" + err);
                                    }
                                    if (charge) {
                                      console.log(
                                        "success" +
                                          JSON.stringify(charge, null, 2)
                                      );
                                    } else {
                                      console.log("something is wrong");
                                    }
                                  }
                                );
                              } else {
                                console.log("something is wrong");
                              }
                            }
                          );
                        } else {
                          console.log("something is wrong");
                        }
                      });
                    } else {
                      console.log(
                        "something is wrong with creating the customer"
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );

    if (!course) {
      return res.status(404).send(`Course with id ${courseId} not found.`);
    }

    if (!user) {
      return res.status(404).send(`User with id ${userId} not found.`);
    }

    // Update the user and course objects with enrollment information
    user.enrolledcourses.push({ course: course._id });
    course.enrolledStudents.push(user._id);
    course.enrollment += 1;
    await Promise.all([user.save(), course.save()]);
    const mailOptions = {
      from: process.env.EXPERTISE_SHAPER_EMAIL,
      to: user.email,
      subject: "Payment Confirmation for Course Purchase",
      html: `
<!doctype html>
<html lang="en-US">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Payment success</title>
    <meta name="description" content="payment verification">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>
<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          
                        
                          
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            paid for a course</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                           Dear ${user.name} We are writing to confirm that your payment for the ${course.name} course has been successfully processed. We would like to take this opportunity to express our gratitude for choosing our platform for your learning needs.
                                           <br />
                                           Once again, thank you for choosing our platform for your learning journey. We look forward to seeing you succeed in the course.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.ExpertiseShaper.com</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>
</html>`,
    };
    await transporter.sendMail(mailOptions);
    res.send({ message: "Enrollment successful." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
//get participants of course
const getUserOfCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res
        .status(404)
        .send(`Course with id ${req.params.courseId} not found.`);
    }
    const students = await User.find({ "enrolledcourses.course": course._id });
    res.send(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//search for course
const searchCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      $text: { $search: req.params.query },
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//search by category
const searchCoursesByCategory = async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.category });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get most popular course
const getCoursePopularity = async (req, res) => {
  try {
    const courses = await Course.aggregate([{ $sort: { enrollment: -1 } }]);
    res.json(courses);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid course id" });
    }
    res.status(500).json({ message: err.message });
  }
};

//filter course by price
const filterCoursesByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const courses = await Course.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get course progress
const getCourseProgress = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const user = await User.findById(userId).populate("enrolledcourses.course");
    for (const enrolledCourse of user.enrolledcourses) {
      if (enrolledCourse.course._id.equals(courseId)) {
        const progress = enrolledCourse.progress;
        return res.status(200).json(progress);
      }
    }
    return res.status(404).json({ message: "Course not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update course progress
const updateProgress = async (req, res, next) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;
  const progress = req.body.progress;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const enrolled = user.enrolledcourses.some((enrolledCourse) =>
      enrolledCourse.course.equals(courseId)
    );

    if (!enrolled) {
      return res
        .status(404)
        .json({ message: "User is not enrolled in this course" });
    }

    const courseIndex = user.enrolledcourses.findIndex((enrolledCourse) =>
      enrolledCourse.course.equals(courseId)
    );

    user.enrolledcourses[courseIndex].progress = progress;
    await course.save();

    if (progress === 100) {
      course.completed = true;
      await course.save();
    }
    await user.save();

    return res.status(200).json({ message: "Progress updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating progress" });
  }
};

//get course by instructor
const getCourseByInstructor = async (req, res, next) => {
  try {
    const instructorId = req.params.instructorId;
    const instructor = await User.findOne({
      _id: instructorId,
      role: "instructor",
    }).populate("postedCourses.course");
    if (!instructor) {
      console.log("Instructor not found");
      return;
    }
    return res.status(200).json(instructor.postedCourses);
  } catch (error) {
    console.error(error);
  }
};

//create review
const createCoureReview = async (req, res, next) => {
  const { rating, comment } = req.body;

  const coure = await Course.findById(req.params.id);
  const user = await User.findById(req.params.userId);

  const review = {
    user: user,
    rating: Number(rating),
    comment,
  };

  coure.reviews.push(review);

  //coure.numReviews = coure.reviews.length;

  coure.rating =
    coure.reviews.reduce((acc, item) => item.rating + acc, 0) /
    coure.reviews.length;

  await coure.save();
  res.status(201).json({ message: "Review added" });
};

//get review
const getCourseReviews = async (req, res, next) => {
  const course = await Course.findById(req.query.id);

  if (!course) {
    return next(new ErrorHander("course not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: course.reviews,
  });
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

  const numOfReviews = reviews.length;

  await course.findByIdAndUpdate(
    req.query.courseId,
    {
      reviews,
      ratings,
      numOfReviews,
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

const getCourseContent = async (req, res, next) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (!course.content) {
      return res.status(404).json({ message: "Course content not found" });
    }
    res.set("Content-Type", course.content.contentType);
    res.send(course.content.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getEnrolledCourses = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.status(200).json(user.enrolledcourses);
};

const similarCourses = async (req, res, next) => {
  let courses;
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "No course found" });
    }
    const category = course.category;
    courses = await Course.find({ category: category, _id: { $ne: courseId } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json({ courses });
};

const addCourseToWishList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    user.favorites.push(course);
    await user.save();
    res.json({ message: "Course added to favorites" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const user = await User.findById(userId);
    const courseIndex = user.favorites.findIndex(
      (course) => course._id == courseId
    );

    if (courseIndex === -1) {
      return res
        .status(404)
        .json({ message: "Course not found in user wishlist" });
    }
    user.favorites.splice(courseIndex, 1);
    await user.save();
    res.json({ message: "Course removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getWishList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const courses = user.favorites;
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const isInWishList = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;

    const user = await User.findById(userId);
    const isInWishlist = user.favorites.includes(courseId);

    res.json({ isInWishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const predictCourses = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const userSkills = user.skills;
  const courses = await Course.find();
  const recommendedCourses = [];
  courses.forEach((course) => {
    const courseCategories = course.category.split(","); 
    let hasAnySkill = false;
    for (let i = 0; i < courseCategories.length; i++) {
      if (userSkills.includes(courseCategories[i])) {
        hasAnySkill = true;
        break;
      }
    }
    if (hasAnySkill) {
      recommendedCourses.push(course);
    }
  });
  res.json(recommendedCourses.slice(0, 2));
};
// get course by name
const getIdCourseByCourseName = async (name) => {
  let course;
  try {
    course = await Course.findOne({ name: name });
  } catch (err) {
    console.log(err);
  }
  if (!course) {
    throw new Error("No Course found");
  }
  return course._id;
};
exports.getAllCourses = getAllCourses;
exports.addCourse = addCourse;
exports.deleteCourse = deleteCourse;
exports.updateCourse = updateCourse;
exports.getById = getById;
exports.addCourseToUser = addCourseToUser;
exports.getUserOfCourse = getUserOfCourse;
exports.searchCourses = searchCourses;
exports.searchCoursesByCategory = searchCoursesByCategory;
exports.getCoursePopularity = getCoursePopularity;
exports.filterCoursesByPrice = filterCoursesByPrice;
exports.updateProgress = updateProgress;
exports.getCourseByInstructor = getCourseByInstructor;
exports.createCoureReview = createCoureReview;
exports.getCourseReviews = getCourseReviews;
exports.deleteReview = deleteReview;
exports.getCourseContent = getCourseContent;
exports.getEnrolledCourses = getEnrolledCourses;
exports.similarCourses = similarCourses;
exports.youtubevideo = youtubevideo;
exports.addCourseToWishList = addCourseToWishList;
exports.removeFromWishlist = removeFromWishlist;
exports.getWishList = getWishList;
exports.isInWishList = isInWishList;
exports.getCourseProgress = getCourseProgress;
exports.predictCourses = predictCourses;
exports.getIdCourseByCourseName=getIdCourseByCourseName