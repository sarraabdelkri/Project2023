const validator = require("validator");
const jwt = require("jsonwebtoken");
const { signAccessToken } = require("../middleware/auth");
const User = require("../model/userModel");
const svgCaptcha = require("svg-captcha");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
// Generate a salt with 10 rounds
const salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
const hash = bcrypt.hashSync('password', salt);
// Compare a password to the hash
const isMatch = bcrypt.compareSync('password', hash);
const path = require("path");
//mongo user verification model
const UserVerification = require("../model/userVerification");
const userSession = require("../model/userSession");

//unique string
const { v4: uuidv4 } = require("uuid");
const userVerification = require("../model/userVerification");
const axios = require("axios");
// Signup
const signup = async (req, res) => {
  let user;
  // var userCaptcha = req.body.captcha;
  // var captchaverif = req.session.captcha;
  // console.log("captcha value:", req.session.captcha);
  // console.log("request captcha:", userCaptcha);
  // console.log("session captcha:", captchaverif);

  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password) {
      throw new Error("name, email, and password are required");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    // if (!userCaptcha || userCaptcha.trim() === "") {
    //   throw new Error("Please enter the captcha value");
    // }
    // if (userCaptcha !== captchaverif) {
    //   console.log("captcha value incorrect");
    //   throw new Error("Captcha not correct");
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      verified: false,
    });
    await user.save().then((result) => {
      // handle account verification
      sendVerificationEmail(result, res);
    });
    const token = jwt.sign({ userId: user._id }, "abc123");
    // res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "No user found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    const accessToken = await signAccessToken(user.id);
    if (isMatch) {
    //   if (!user.verified) {
    //     return res.status(401).json({
    //       message: "Please verify your email",
    //     });
    //   }
      if (user.banned) {
        return res.status(401).json({
          message: "You are suspended from the platform",
        });
      }
      const { password, ...userWithoutPassword } = user.toObject();
      const session = new userSession({
        userId: user._id,
        startTime: new Date(),
      });
      await session.save();
      res.status(200).json({
        message: "Login successful",
        accessToken,
        session,
        user: userWithoutPassword,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error logging in",
      error: error.message || "Internal server error",
    });
  }
};
//logout
const logout = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "No token found",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const session = await userSession.findOne({
      userId: userId,
      endTime: null,
    });
    if (session) {
      session.endTime = new Date();
      await session.save();
    }
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error logging out",
      error: error.message || "Internal server error",
    });
  }
};

//get user by id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id)
      .populate("enrolledcourses.course", "name enddate startdate")
      .populate("postedCourses.course", "name enddate startdate")
      .populate("notifications.notification", "message createdAt");
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }
  return res.status(200).json({ user });
};

//get user Name
const getUserNameById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }
  const userName = user.name; // get the name of the user
  return res.status(200).json({ userName });
};

//get all users
const Userslist = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  } else {
    return res.status(200).json({ users });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id.trim();
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(String(password), String(user.password));

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    console.log('Updated user:', updatedUser);

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, error: error.message });
  }
};




const updateUserpassword = async (req, res) => {
  const connectUserId = req.params.id.trim();
  const { password } = req.body;
  const user = await User.findById(connectUserId);


  // Make sure that password is a string or buffer
  const passwordBuffer = Buffer.from(String(password), 'utf-8');

  
  try {
    const hashedPassword = await bcrypt.hash(passwordBuffer, 10);
    const id = connectUserId.replace(/\n/g, '');

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    const mailOptions = {
      from: process.env.EXPERTISE_SHAPER_EMAIL,
      to: user.email,
      subject: "Update Password",
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
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Update Password 
                                           </h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                           Dear ${user.name} We are writing to confirm that your password updated Success. We would like to take this opportunity to express our gratitude for choosing our platform for your learning needs.
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
    
    console.log("Updated user:", updatedUser);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};






//Delete user
const deleteUser = (req, res) => {
  const connectUserId = req.auth.userId;

  User.findById(connectUserId).then((user) => {
    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    User.findByIdAndRemove(req.params._id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

//show captcha value in console
const showCaptcha = (req, res, next) => {
  console.log(req.session.captcha);
};
// Generate captcha and store in session
const generateCaptcha = (req, res) => {
  const captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;
  res.type("svg").send(captcha.data);
};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "expertiseshaper@gmail.com",
    pass: "jhuosyrjxednxvcf",
  },
});
// send verification email
const sendVerificationEmail = ({ _id, email }, res) => {
  const url = process.env.BACKEND_URL;
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.EXPERTISE_SHAPER_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Verify your email adress to complete the signup and login into your account.</p>
    <p>This link <b> expires in 6 hours</b>.</p>
    <p>Click on this <a href="${url + "user/verify/" + _id + "/" + uniqueString
      }">link</a> to verify your email.</p>`,
  };

  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      // set values in userVerification model
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });
      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              res.json({
                message: "Verification email sent",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(() => {
      res.json({
        message: "Error occured while hashing the unique string",
      });
    });
};

//verify user email
const verifyUserEmail = async (req, res) => {
  let { userId, uniqueString } = req.params;

  userVerification
    .find({ userId })
    .then((result) => {
      if (result.length > 0) {
        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;
        // check if the record has expired
        if (expiresAt < Date.now()) {
          // record has expired so we delete it
          userVerification
            .deleteOne({ userId })
            .then((result) => {
              User.deleteOne({ _id: userId })
                .then(() => {
                  let message =
                    "Verification link has expired. Please signup again";
                  res.redirect(`/user/verified/error=true&message=${message}`);
                })
                .catch((error) => {
                  let message =
                    "Clearing expired user verification record failed";
                  res.redirect(`/user/verified/error=true&message=${message}`);
                });
            })
            .catch((error) => {
              let message =
                "Error occured while clearing expired user verification record";
              res.redirect(`/user/verified/error=true&message=${message}`);
            });
        } else {
          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                //strings match
                User.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    userVerification
                      .deleteOne({ userId })
                      .then(() => {
                        res.sendFile(
                          path.join(__dirname, "../views/verified.html")
                        );
                      })
                      .catch((error) => {
                        console.log(error);
                        let message =
                          "Error occured while finilizing successful user verification";
                        res.redirect(
                          `/user/verified/error=true&message=${message}`
                        );
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    let message =
                      "Error occured while updating the user record";
                    res.redirect(
                      `/user/verified/error=true&message=${message}`
                    );
                  });
              } else {
                let message =
                  "Incorrect verification details passed. Check your inbox.";
                res.redirect(`/user/verified/error=true&message=${message}`);
              }
            })
            .catch((err) => {
              console.log(err);
              let message =
                "Error occured while comparing the hashed unique string";
              res.redirect(`/user/verified/error=true&message=${message}`);
            });
        }
      } else {
        let message =
          "Account record not found or has been verified already.Please signup or login to your account";
        res.redirect(`/user/verified/error=true&message=${message}`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = "Error occured while verifying the email";
      res.redirect(`/user/verified/error=true&message=${message}`);
    });
};

// verify page route
const verifyEmailPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/verified.html"));
};

// Create a nodemailer transporter
const transporteer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "expertiseshaper@gmail.com",
    pass: "jhuosyrjxednxvcf",
  },
});
const forgotPassword = async ({ body: { email } }, res) => {
  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(404)
      .json({ message: "Email does not exist.", status: "error" });

  // generate a random token for the user
  const generatedToken = crypto.randomBytes(32);
  if (!generatedToken) {
    return res.status(500).json({
      message: "An error occurred. Please try again later.",
      status: "error",
    });
  }
  const convertTokenToHexString = generatedToken.toString("hex");

  user.resetToken = convertTokenToHexString;
  user.expireToken = Date.now() + 600000; //10 minutes

  try {
    const saveToken = await user.save();
    const userId = user._id;

    const resetLink = `${process.env.BACKEND_URL_HOSTNAME}/reset-password?resetToken=${saveToken.resetToken}`;
    const mailOptions = {
      from: process.env.EXPERTISE_SHAPER_EMAIL,
      to: email,
      subject: "Reset your password",
      html: `
<!doctype html>
<html lang="en-US">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
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
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="${resetLink}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
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
    await transporteer.sendMail(mailOptions);

    return res.status(200).json({
      message: "Reset link sent to email.",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `An error occurred while trying to save the token -> ${error}`,
    });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ resetToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetToken !== resetToken) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    if (Date.now() > user.expireToken) {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetToken: null,
      expireToken: null,
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verifyRecaptchaToken = async (req, res) => {
  //Destructuring response token from request body
  const { token } = req.body;
  //sends secret key and response token to google
  await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${"6LdOnP4kAAAAAAezxvvXbhXZxUq6ZlLHTbyh6oBr"}&response=${token}`
  );
  //check response status and send back to the client-side
  if (res.status(200)) {
    res.send("Human");
  } else {
    res.send("Robot ");
  }
};

const banUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(400).json({ message: "You cannot ban an admin" });
    }
    user.banned = true;
    await user.save().then(() => {
      res
        .status(200)
        .json({ message: "User banned successfully", action: "ban" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const unbanUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(400).json({ message: "You cannot ban an admin" });
    }
    user.banned = false;
    await user.save().then(() => {
      res
        .status(200)
        .json({ message: "User unbanned successfully", action: "unban" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const sendConfirmationEmail = async (toEmail) => {
  try {
    const message = {
      from: "expertiseshaper@gmail.com",
      to: toEmail,
      subject: "Expertise Shaper: Employer Request Received",
      html: `
  <!doctype html>
  <html lang="en-US">
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Reset Password Email Template</title>
      <meta name="description" content="Reset Password Email Template.">
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
                                          <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">We have received your request to become an employer on Expertise Shaper</h1>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                          Your request is under review by our site administrator. We will notify you once your request has been approved.
                                          </p>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                          Thank you for choosing Expertise Shaper.
                                          </p>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                          Best regards
                                          </p>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                          The Expertise Shaper Team.
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

    await transporter.sendMail(message);
    console.log("Confirmation email sent successfully");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to send confirmation email");
  }
};

const requestEmployerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { company, websitecompany, linkedinUrl } = req.body;
    user.company = company;
    user.websitecompany = websitecompany;
    user.linkedinUrl = linkedinUrl;
    user.employerRequest = true;
    await user.save();

    // Send confirmation email to the user
    await sendConfirmationEmail(user.email);

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const cancelRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.employerRequest = false;
    await user.save();
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const approveEmployer = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.employerRequest = false;
    user.role = "employer";
    await user.save();
    return res.status(200).json({ message: "Employer profile approved" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const declineEmployer = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.employerRequest = false;
    await user.save();
    return res.status(200).json({ message: "Employer profile declined" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;
    const profilePicture = req.file.filename;

    const user = await User.findById(userId);
    user.profilePicture = profilePicture;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getnotifications = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).populate(
      "notifications",
      "message createdAt"
    );

    const notifications = user.notifications;
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isAdmin = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, "verySecretValue");
    const user = await User.findById(decoded._id);
    if (user.role === "admin") {
      return res.status(200).json({ message: "admin" });
    } else {
      return res.status(200).json({ message: "not admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateSession = async (req, res) => {
  const userId = req.params.userId;
  const session = await userSession.findOne({ userId }).sort({ startTime: -1 });
  if (!session) {
    return res.status(404).send({ message: "Session not found" });
  }
  session.endTime = new Date();
  await session.save();

  res.send(session);
};

const deleteSession = async (req, res) => {
  const userId = req.params.userId;

  const session = await userSession.findOne({ userId });
  if (!session) {
    return res.status(404).send({ message: "Session not found" });
  }

  await session.deleteOne();

  res.send("session deleted");
};
const getSessionDurations = async (req, res) => {
  const userId = req.params.userId;

  const sessions = await userSession.find({ userId }).sort({ startTime: 1 });

  if (!sessions.length) {
    return res.status(404).send({ message: "No sessions found for user" });
  }

  const durations = sessions.slice(0, -1).map((session) => {
    const startTime = new Date(session.startTime);
    const endTime = new Date(session.endTime);
    const duration = Math.round((endTime - startTime) / 1000); // in seconds
    return duration;
  });

  const totalDuration = durations.reduce((acc, duration) => acc + duration, 0);

  res.send({ totalDuration });
};

const getLastSessionDuration = async (req, res) => {
  const userId = req.params.userId;

  const session = await userSession
    .findOne({ userId })
    .sort({ startTime: -1 })
    .skip(1);
  if (!session) {
    return res.status(404).send({ message: "Session not found" });
  }
  const startTime = new Date(session.startTime);
  const endTime = new Date(session.endTime);
  const duration = Math.round((endTime - startTime) / 1000); // in seconds

  res.send({ duration });
};

const getEmployerRequests = async (req, res) => {
    try {
        const users = await User.find({ employerRequest: true });
        res.json({users: users});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
  Userslist,
  getById,
  getUserNameById,
  updateUser,
  signup,
  login,
  deleteUser,
  generateCaptcha,
  showCaptcha,
  forgotPassword,
  resetPassword,
  verifyUserEmail,
  verifyEmailPage,
  logout,
  verifyRecaptchaToken,
  banUser,
  unbanUser,
  approveEmployer,
  declineEmployer,
  requestEmployerProfile,
  updateProfilePicture,
  getnotifications,
  isAdmin,
  updateSession,
  deleteSession,
  getLastSessionDuration,
  getSessionDurations,
  updateUserpassword,
  cancelRequest,
  getEmployerRequests,
};