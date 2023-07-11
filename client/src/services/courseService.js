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
  }
 
};

export default courseService;
