  
  
  import { create } from "zustand";
  import jobService from "@/services/jobService";
  
  const useJobStore = create((set, get) => ({
    jobs: [],
    setJobs: (jobs) => set({ jobs }),
    fetchJobs: async () => {
     
      await jobService.getAllJobs().then((res) => {
        if (res.status == 200) {
          const jobs = res.data.job; // access the job array in the response
          set({ jobs });
          
        }
      });
    },
  }));
  
    export default useJobStore;