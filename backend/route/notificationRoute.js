const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notificationController");
router.post("/addNotification", notificationController.addNotification);
router.get("/getbyid/:id", notificationController.getNotificationById);
router.get(
  "/getusernotifications/:userId",
  notificationController.getUserNotifications
);
router.delete(
  "/deleteAll/:userId",
  notificationController.deleteUserNotifications
);

module.exports = router;
