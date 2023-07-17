import API from "./api";

const courseService = {
  getAllCourses: () => {
    return API.get("/course");
  },
  addCourse: (
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
    return API.post(`/course/${id}`, {
      file: file,
      name: name,
      description: description,
      category: category,
      duration: duration,
      startdate: startdate,
      enddate: enddate,
      price: price,
    });
  },
  getCourseById: (id) => {
    return API.get(`/course/${id}`);
  },
  addCourseToUser: (userId, courseId) => {
    return API.post(`/course/addCourseToUser/${userId}/courses/${courseId}`);
  },
  getEnrolledCourses: (userId) => {
    return API.get(`/course/getenrolledcourses/${userId}`);
  },
  similarCourses: (courseId) => {
    return API.get(`/course/similarcourses/${courseId}`);
  },
  getCourseContent: (courseId) => {
    return API.get(`/course/${courseId}/content`);
  },
  getCourseVideos: (courseId) => {
    return API.get(`/course/${courseId}/content`);
  },
  updateProgress: (userId, courseId, progress) => {
    return API.put(`/course/updateProgress/${userId}/${courseId}`, {
      progress,
    });
  },
  addToWishlist: (userId, courseId) => {
    return API.post(`/course/${userId}/${courseId}/wishlist`);
  },
  removeFromWishlist: (userId, courseId) => {
    return API.delete(`/course/${userId}/${courseId}/removeFromWishlist`);
  },
  isInWishList: (userId, courseId) => {
    return API.get(`/course/isInWishList/${userId}/${courseId}`);
  },
  getCourseProgress: (userId, courseId) => {
    return API.get(`/course/courseProgress/${userId}/${courseId}`);
  },
  updateSession: async (userId) => {
    return API.put(`/user/sessions/${userId}`);
  },
  getLastSessionDuration: async (userId) => {
    return API.get(`/user/session/duration/${userId}`);
  },
  getSessionDurations:async (userId) => {
    return API.get(`/user/session/alldurations/${userId}`);
  },
  predictRecommandedCourses:async (userId) => {
    return API.get(`course/${userId}/courses/predict`);
  },
  getIdCourseByCourseName:async (name) => {
    return API.get(`course/getbyname/${name}`);
  },
};

export default courseService;
