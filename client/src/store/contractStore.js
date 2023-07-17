import { create } from "zustand";
import contractService from "@/services/contractService";

const useContractStore = create((set, get) => (
  {
    
    contracts: [],
    contract :null,
    setContracts: (contracts) => set({ contracts }),
    fetchContracts: async () => {
        await contractService.getAllContracts().then((res) => {
            if (res.status == 200) {
                set({ contracts: res.data.contracts });
            }
        });
        console.log(get().contracts);
        console.log("fetchContracts", get().contracts);
    },
    
    getContractByIdemployer: async (employerId) => {
        await contractService.getContractByidemployer(employerId).then((res) => {
            if (res.status == 200) {
                set({ contracts: res.data.contracts });
            }
        });
    },

    getuserbyid: async (id) => {
        await contractService.getuserbyid(id).then((res) => {
            if (res.status == 200) {
                set({ contracts: res.data.contracts });
            }
        });
    },
    getjobbyid: async (id) => {
        await contractService.getjobbyid(id).then((res) => {
            if (res.status == 200) {
                set({ contracts: res.data.contracts });
            }
        });   
    },

    deleteContract: async (id) => {
        try {
          await contractService.deleteContract(id);
          return true; // or some other success value
        } catch (error) {
          return false; // or some other error value
        }
      },
     addContract: async (startDate, endDate,contractstatus, type, user, job,userId,jobId) => {
       await contractService.addContract(startDate, endDate,contractstatus, type, user, job,userId,jobId);
       console.log("contract added");
      },

  
  updateContract: async (id, contractstatus) => {
  await contractService.updateContract(id, contractstatus);
  setContract(prevState => ({ ...prevState, status: contractstatus }));
        },

    getContractById: async (id) => {
   const res = await contractService.getcontractById(id);
        if (res.status == 200) {
            const contract = res.data.contract;
            set({ contract});
           
            return contract;
           
        }else {
            console.error("Failed to fetch contract details");
            return null;
        
        }
        
    },

    applications: [],
    application:null,
    setApplications: (applications) => set({ applications }),
    fetchApplications: async () => {
        await contractService.getallapplications().then((res) => {
            if (res.status == 200) {
            // access the job array in the response
            set({ applications :res.data.applications });
            console.log ( {applications : res.data.applications});
            
            }
        });
        },
}));

export default useContractStore;