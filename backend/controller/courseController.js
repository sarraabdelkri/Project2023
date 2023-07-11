const Course = require("../model/course");
const User = require("../model/userModel");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

  // Check if the instructor exists in the users collection and has the role of "instructor"
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
      fileName: file.originalname,
    },
    instructor: instructor,
  });
  try {
    instructor.postedCourses.push({ course: course._id });
    await course.save();
    await instructor.save();
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
    course = await Course.findById(id)
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
              unit_amount: course.price,
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

    const enrolled = user.enrolledcourses.some((enrolledCourse) => enrolledCourse.course.equals(courseId));

    if (!enrolled) {
      return res
        .status(404)
        .json({ message: "User is not enrolled in this course" });
    }

    const courseIndex = user.enrolledcourses.findIndex((enrolledCourse) => enrolledCourse.course.equals(courseId));

    console.log("courseIndex:", courseIndex);
    user.enrolledcourses[courseIndex].progress = progress;
    await course.save();
    console.log(
      "user.courses[courseIndex].progress:",
      user.enrolledcourses[courseIndex].progress
    );
    console.log("progress:", progress);

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

  coure.numReviews = coure.reviews.length;

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
