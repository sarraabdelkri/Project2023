import API from "./api";

const notificationService = {
  sendNotification: (userId, message) => {
    return API.post(`/notification/addNotification`, { userId, message });
  },
  getUserNotifications: (userId) => {
    return API.get(`/user/notifications`, userId);
  },
  getNotificationById: (id) => {
    return API.get(`/notification/getbyid/${id}`, id);
  },
  getUserNotifications: (userId) => {
    return API.get(`/notification/getusernotifications/${userId}`, userId);
  },
  clearNotifications: (userId) => {
    return API.delete(`/notification/deleteAll/${userId}`);
  },
};

export default notificationService;
