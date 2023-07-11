import { create } from "zustand";
import contractService from "@/services/contractService";

const useContractStore = create((set, get) => (
  {
    contracts: [],
    setContracts: (contracts) => set({ contracts }),
    fetchContracts: async () => {
        await contractService.getAllContracts().then((res) => {
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
     addContract: async (startDate, endDate, type, user, job) => {
       await contractService.addContract(startDate, endDate, type, user, job);
       console.log("contract added");
      },
// other methods...
  
      updateContract: async (id, contractstatus) => {
        try {
          await contractService.updateContract(id, contractstatus);
          return true; // or some other success value
        } catch (error) {
          return false; // or some other error value
        }
      },
   
}));

export default useContractStore;