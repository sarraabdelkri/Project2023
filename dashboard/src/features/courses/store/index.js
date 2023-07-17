import { create } from "zustand";
import courseService from "@courses/service";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useCourseStore = create((set) => ({
    courses: [],
    isLoading: false,
    isLoaded: false,
    setCourses: (courses) => set({ courses }),
    removeCourse: (course) =>
        set((state) => ({
            courses: state.courses.filter((_course) => _course._id !== course._id),
        })),
    fetchCourses: async () => {
        set({ isLoading: true });
        const req = await courseService
            .getAll()
            .then((data) => {
                set({
                    courses: data.courses,
                    isLoading: false,
                    isLoaded: true,
                });
            })
            .catch((err) => {
                set({ isLoading: false });
                throw err;
            });
    },
    clearCourses: () => set({ courses: [] }),
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
        await courseService.add(
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
}));

// mount store
mountStoreDevtool("courses", useCourseStore);

export default useCourseStore;
