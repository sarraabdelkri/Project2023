const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const upload = require('../middleware/multer');
const { auth } = require("../middleware/auth");
router.get("/getUser/:id", userController.getById);
router.get("/getUserNameById/:id", userController.getUserNameById);

router.delete("/deleteUser/:_id", auth, userController.deleteUser);
router.get("/getAllUsers", userController.Userslist);
router.put("/updateUser/:_id", auth, userController.updateUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/ShowSessionCaptcha", userController.showCaptcha);
router.get("/generateCaptcha", userController.generateCaptcha);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:resetToken", userController.resetPassword);
router.get("/verify/:userId/:uniqueString", userController.verifyUserEmail);
router.get("/verified", userController.verifyEmailPage);
router.get("/logout", userController.logout);
router.post("/verifyRECaptcha", userController.verifyRecaptchaToken);
router.put("/ban/:id", userController.banUser);
router.put("/unban/:id", userController.unbanUser);
router.put("/approve-employer/:id", userController.approveEmployer);
router.put("/request-employer-profile/:id", userController.requestEmployerProfile);
router.post('/profile-picture', upload.single('profilePicture'), userController.updateProfilePicture)
module.exports = router;
