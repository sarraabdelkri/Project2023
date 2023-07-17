import { API } from "@services/api";

const assessmentService = {
    getAll: () => API.get("/assessment/getAllAssessment"),
    get: (id) => API.get(`/assessment/${id}`),
    create: (data) => API.post(`/assessment/createAssessment`, data),
    update: (id, data) => API.put(`/assessment/updateAssessment/${id}`, data),
    delete: (id) => API.delete(`/assessment/deleteAssessment/${id}`),
};

export default assessmentService;
