import API from "./api";
const reviewService = {

    createCourseReview : (userId, courseId) => {
    return API.post(`/review/${courseId}/reviews/${userId}`);
    
    }
}
export default reviewService;