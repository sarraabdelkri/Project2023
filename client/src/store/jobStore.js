import { create } from "zustand";
import jobService from "@/services/jobService";

const useJobStore = create((set, get) => ({
  jobs: [],
  job:null,
  setJobs: (jobs) => set({ jobs }),
  fetchJobs: async () => {
    await jobService.getAllJobs().then((res) => {
      if (res.status == 200) {
        const jobs = res.data.job; // access the job array in the response
        set({ jobs });
        
      }
    });
  },
  getJobById: async (id) => {
    const res = await jobService.getJobById(id);
    if (res.status === 200) {
      const job = res.data.job;
      set({ job });
      return job;
    } else {
      console.error("Failed to fetch job details");
      return null;
    }
  },
  deleteJob: async (id) => {
    const res = await jobService.deleteJob(id);
  },
  updateJob: async (id, title, workplaceType, location, jobType, requiredSkills, aboutJob) => {
     await jobService.updateJob(id, title, workplaceType, location, jobType, requiredSkills, aboutJob);
    },
  }));

  export default useJobStore;