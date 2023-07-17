import { create } from "zustand";
import reviewService from "@/services/reviewService";

const useReviewStore = create((set, get) => (
    {
      reviews: [],
      setReviews: (reviews) => set({ reviews }),
    
      createCourseReview: async (userId, courseId) => {
        const res =  await reviewService.createCourseReview(userId, courseId).then((res) => {
          if (res.status == 200) {
            const reviews = res.data.review;
            set({ reviews });
            console.log("review created successfuly");
          }
          return res;
    });

}
}));
export default useReviewStore;