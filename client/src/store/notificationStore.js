import { create } from "zustand";
import notificationService from "@/services/notificationService";

const notificationStore = create((set, get) => ({
  notifications: [],
  notification: null,
  setNotifications: (notifications) => set({ notifications }),
  sendNotification: async (userId, message) => {
    await notificationService.sendNotification(userId, message);
  },
  getUserNotifications: async (userId) => {
    const response = await notificationService.getUserNotifications(userId);
    return response.data;
  },
  getnotificationbyid: async (id) => {
    try {
      const res = await notificationService.getNotificationById(id);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  getUserNotifications: async (userId) => {
    try {
      const res = await notificationService.getUserNotifications(userId);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  clearNotifications: async (userId) => {
    try {
      const res = await notificationService.clearNotifications(userId);
      if (res.ok) {
        set({ notifications: [] });
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default notificationStore;
