import { create } from "zustand";
import jobService from "@jobs/service";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useJobsStore = create((set) => ({
    jobs: [],
    isLoading: false,
    isLoaded: false,
    setJobs: (jobs) => set({ jobs }),
    removeJob: async (job) => {
        const req = await jobService
            .delete(job._id)
            .then((data) => {
                set((state) => ({
                    jobs: state.jobs.filter((_job) => _job._id !== job._id),
                }))
            })
    },
    fetchJobs: async () => {
        set({ isLoading: true });
        const req = await jobService
            .getAll()
            .then((data) => {
                set({ jobs: data.job, isLoading: false, isLoaded: true });
            })
            .catch((err) => {
                set({ isLoading: false });
                throw err;
            });
    },
    clearJobs: () => set({ jobs: [] }),
    addJob: async (job) => {
        const req = await jobService
            .add(job)
            .then((data) => {
                set((state) => ({
                    jobs: [...state.jobs, data.job],
                }));
            });
    },
    updateJob: async (job) => {
        const req = await jobService
            .update(job._id, job)
            .then((data) => {
                set((state) => ({
                    jobs: state.jobs.map((_job) => {
                        if (_job._id === job._id) {
                            return job;
                        }
                        return _job;
                    }),
                }));
            });
    },
}));

// mount store
mountStoreDevtool("jobs", useJobsStore);

export default useJobsStore;
