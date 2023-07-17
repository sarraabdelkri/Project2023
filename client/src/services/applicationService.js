import API from "./api";


const applicationService = {
    applyToJob: (jobId) => {
        return API.post(`/application/apply/${jobId}`);
    },
    getallapplications: () => {
        return API.get("/application/");
    },
    getApplicationsByJobId: (jobId) => {
        return API.get(`/application/${jobId}`);
    },
    deleteApplication: (applicationId) => {
        return API.delete(`/application/${applicationId}`);
    },
}

export default applicationService;