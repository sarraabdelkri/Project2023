import API from "./api";

const jobService = {
    getAllJobs: () => {
        return API.get("/job/getalljobs");
    },
}
export default jobService;