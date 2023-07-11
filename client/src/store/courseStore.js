import { create } from "zustand";
import courseService from "@/services/courseService";

const courseStore = create((set, get) => ({
  courses: [],
  course: null,
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
}));

export default courseStore;
