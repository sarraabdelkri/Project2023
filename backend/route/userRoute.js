const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const uploads = require('../middleware/multerr')
const { auth } = require("../middleware/auth");
const path = require('path');
const User = require("../model/userModel");


router.get("/getUser/:id", userController.getById);
router.get("/getUserNameById/:id", userController.getUserNameById);
router.delete("/deleteUser/:_id", auth, userController.deleteUser);
router.get("/getAllUsers", userController.Userslist);
router.put("/updateUser/:id",  userController.updateUser);
router.put("/updateUserpassword/:id", userController.updateUserpassword);
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
router.get('/employers-requests',userController.getEmployerRequests)
router.put("/approve-employer/:id",userController.approveEmployer);
router.put("/decline-employer/:id",userController.declineEmployer);
router.put("/request-employer-profile/:id",userController.requestEmployerProfile);
router.put("/cancel-request/:id",userController.cancelRequest);
router.post('/profile-picture/:userId', uploads.single('profilePicture'),userController.updateProfilePicture);
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));
router.get('/fetch/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "user" });
    }
    
    const filePath = path.join(__dirname, '../uploads', user.profilePicture);
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/notifications',userController.getnotifications)
router.post('/is-admin', userController.isAdmin);
router.put('/sessions/:userId', userController.updateSession);
router.delete('/sessionClear/:userId', userController.deleteSession);
router.get('/session/duration/:userId',userController.getLastSessionDuration)
router.get('/session/alldurations/:userId',userController.getSessionDurations)


module.exports = router;