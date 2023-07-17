import { create } from "zustand";
import courseService from "@/services/courseService";

const courseStore = create((set, get) => ({
  courses: [],
  course: null,
  courseContent: null,
  setCourses: (courses) => set({ courses }),
  fetchCourses: async () => {
    await courseService.getAllCourses().then((res) => {
      if (res.status == 200) {
        set({ courses: res.data.courses });
      }
    });
  },
  addCourse: async (
    id,
    file,
    name,
    description,
    category,
    duration,
    startdate,
    enddate,
    price
  ) => {
    await courseService.addCourse(
      id,
      file,
      name,
      description,
      category,
      duration,
      startdate,
      enddate,
      price
    );
  },
  getCourseById: async (id) => {
    const res = await courseService.getCourseById(id);
    if (res.status === 200) {
      const course = res.data.course;
      set({ course });
      return course;
    } else {
      console.error("Failed to fetch course details");
      return null;
    }
  },
  addCourseToUser: async (userId, courseId) => {
    await courseService.addCourseToUser(userId, courseId).then((res) => {
      if (res.status == 200) {
        console.log("enrolled successfuly");
      }
    });
  },
  getEnrolledCourses: async (userId) => {
    const res = await courseService.getEnrolledCourses(userId);
    if (res.status === 200) {
      return res.data;
    }
    return [];
  },
  similarCourses: async (courseId) => {
    try {
      const response = await courseService.similarCourses(courseId);
      const courses = response.data.courses;
      set({ courses });
      return courses;
    } catch (err) {
      console.error(err);
    }
  },
  getCourseContent: async (courseId) => {
    try {
      const response = await courseService.getCourseContent(courseId);
      const content = response.data;
      return content;
    } catch (error) {
      console.error(error);
    }
  },
  updateProgress: async (userId, courseId, progress) => {
    try {
      await courseService.updateProgress(userId, courseId, progress);
    } catch (error) {
      console.error(error);
    }
  },
  addToWishlist: async (userId, courseId) => {
    try {
      await courseService.addToWishlist(userId, courseId);
    } catch (error) {
      console.error(error);
    }
  },
  removeFromWishlist: async (userId, courseId) => {
    try {
      await courseService.removeFromWishlist(userId, courseId);
    } catch (error) {
      console.error(error);
    }
  },
  isInList: async (userId, courseId) => {
    try {
      const res = await courseService.isInWishList(userId, courseId);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  getCourseProgress: async (userId, courseId) => {
    try {
      const res = await courseService.getCourseProgress(userId, courseId);
      return res;
    } catch (error) {
      console.error(error);
    }
  },
  updateSession: async (userId) => {
    await courseService.updateSession(userId).then((res) => {
      if (res.status == 200) {
        return res;
      }
      console.error("problem with updating session time");
    });
  },
  getLastSessionDuration: async (userId) => {
    return courseService.getLastSessionDuration(userId).then((res) => {
      if (res.status == 200) {
        return res.data.duration;
      }
      console.error("problem with getting session duration");
    });
  },
  getSessionDurations: async (userId) => {
    return courseService.getSessionDurations(userId).then((res) => {
      if (res.status == 200) {
        return res.data.totalDuration;
      }
      console.error("problem with getting total duration of sessions");
    });
  },
  predictRecommandedCourses: async (userId) => {
    return courseService.predictRecommandedCourses(userId).then((res) => {
      if (res.status == 200) {
        return res;
      }
      console.error("problem with getting recommanded courses for the user");
    });
  },
  getIdCourseByCourseName:async (name) => {
    return courseService.getIdCourseByCourseName(name)
  },
}));

export default courseStore;
