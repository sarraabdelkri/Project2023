import { API, mockApi } from "@services/api";

const userService = {
    getAll: () => API.get("/user/getAllUsers"),
    getEmpRequests: () => API.get("/user/employers-requests"),
    get: (id) => API.get(`/user/${id}`),
    ban: (id) => API.put(`/user/ban/${id}`),
    unban: (id) => API.put(`/user/unban/${id}`),
    approve: (id) => API.put(`/user/approve-employer/${id}`),
    decline: (id) => API.put(`/user/decline-employer/${id}`),
};

export default userService;
