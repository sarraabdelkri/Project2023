import API from "./api";

const authService = {
  getAllUsers: () => {
    return API.get("/user/getAllUsers");
  },
  banUser: (id) => {
    return API.put(`/user/ban/${id}`);
  },
  unbanUser: (id) => {
    return API.put(`/user/unban/${id}`);
  },
  updateUser: (id, name, email, password ) => {
    
    return API.put(`/user/updateUser/${id}`, {
      name: name,
      email: email,
      password: password,
    });
  },
  updateUserpassword: (id, password  ) => {
    
    return API.put(`/user/updateUserpassword/${id}`, {
     password: password,
    });
  },
  getUserById: (id) => {
    return API.get(`/user/getUser/${id}`);
  },
  getUserWishlist: (userId) => {
    return API.get(`/course/getWishList/${userId}`);
  },
};

export default authService;
