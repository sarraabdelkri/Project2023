import { API } from "@services/api";

const token = () => {
    const token = localStorage.getItem("token");
    return token;
}

const jobService = {
    getAll: () => API.get("/job/getalljobs"),
    get: (id) => API.get(`/job/${id}`),
    add: (data) => API.post("/job/addjob", { data, headers: {"Authorization": `Bearer ${token()}`}}),
    update: (id, data) => API.put(`/job/${id}`, { data }),
    delete: (id) => API.delete(`/job/${id}`),
};

export default jobService;
