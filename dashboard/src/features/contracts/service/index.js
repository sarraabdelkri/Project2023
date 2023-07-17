import { API } from "@services/api";

const contractService = {
    getAll: () => API.get("/contract/getAllContracts"),
    get: (id) => API.get(`/contract/${id}`),
    create: (userId, jobId, atelierId, data) => API.post(`/contract/${userId}/${jobId}/${atelierId}`, data),
    update: (id, data) => API.put(`/contract/contracts/${id}`, data),
    delete: (id) => API.delete(`/contract/contracts/${id}`),
};

export default contractService;
