import { create } from "zustand";
import applicationService from "@/services/applicationService";

const useApplicationStore = create((set, get) => ({
    applications: [],
    application:null,
    setApplications: (applications) => set({ applications }),
    fetchApplications: async () => {
        await applicationService.getallapplications().then((res) => {
            if (res.status == 200) {
            // access the job array in the response
            set({ applications :res.data.applications });
            console.log ( {applications : res.data.applications});
            
            }
        });
        },
    applyToJob: async (jobId) => {
        await applicationService.applyToJob(jobId);
        },
    fetchApplicationsByJobId: async (jobId) => {
        await applicationService.getApplicationsByJobId(jobId).then((res) => {
            if (res.status == 200) {
            const applications = res.data.applications; // access the job array in the response
            set({ applications });
            }
        });
        },
    deleteApplication: async (applicationId) => {
        await applicationService.deleteApplication(applicationId);
        },
    }));

    export default useApplicationStore;
