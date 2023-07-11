import API from "./api";

const authService = {
    login: (email, password) => {
        return API.post("/user/login", { email, password });
    },
    signup: (name, email, password) => {
        return API.post("/user/signup", { name, email, password });
    },
    forgot: (email) => {
        return API.post("/user/forgot-password", { email });
    },
    resetPassword: (token, newPassword) => {
        return API.post(`/user/reset-password/${token}`, { newPassword });
    }
}

export default authService;