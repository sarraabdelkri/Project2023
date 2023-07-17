const Notification = require("../model/notification");
const User = require("../model/userModel");

const addNotification = async (req, res, next) => {
  try {
    const { userId, message } = req.body;
    const user = await User.findById(userId);
    const newNotification = new Notification({
      user,
      message,
    });
    if (!user) {
      throw new Error("User not found");
    }
    user.notifications.push(newNotification);
    await newNotification.save();
    await user.save();
    res.status(201).json({
      success: true,
      data: newNotification,
    });
  } catch (error) {
    next(error);
  }
};

const getNotificationById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const notification = await Notification.findById(id);
    if (!notification) {
      throw new Error("Notification not found");
    }
    const { message, createdAt } = notification;
    res.status(200).json({ message, createdAt });
  } catch (error) {
    next(error);
  }
};
const getUserNotifications = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ user: userId });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};
// const deleteUserNotifications = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { notifications: [] },
//       { new: true }
//     ).populate("notifications.notification");

//     const notificationIds = user.notifications.map(
//       (notif) => notif.notification._id
//     );
//     await Notification.deleteMany({ _id: { $in: notificationIds } });

//     res.status(200).json({
//       message: "All notifications deleted successfully.",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Internal server error.",
//     });
//   }
// };
const deleteUserNotifications = async (req, res) => {
  const userId = req.params.userId;
  try {
    await Notification.deleteMany({ user: userId });
    res.status(200).send("Notifications deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
exports.addNotification = addNotification;
exports.getNotificationById = getNotificationById;
exports.getUserNotifications = getUserNotifications;
exports.deleteUserNotifications = deleteUserNotifications;
