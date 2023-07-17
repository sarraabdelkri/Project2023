import API from "./api";

const jobService = {
    getAllJobs: () => {
        return API.get("/job/getalljobs");
    },
    getJobById: (id) => {
      return API.get(`/job/${id}`);
    },
    deleteJob: (id) => {
      return API.delete(`/job/${id}`);
    },
    updateJob: (id,title, workplaceType, location, jobType, requiredSkills, aboutJob) => {
      return API.put(`/job/${id}`, { title, workplaceType, location, jobType, requiredSkills, aboutJob });
    },
}
export default jobService;