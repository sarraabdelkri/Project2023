  
  
  import { create } from "zustand";
  import atelierService from "@/services/atelierService";
  
  const useAtelierStore = create((set, get) => ({
    ateliers: [],
    setAteliers: (ateliers) => set({ ateliers }),
    fetchAteliers: async () => {
      await atelierService.getAllAtelier().then((res) => {
        if (res.status == 200) {
          set({ ateliers :res.data.ateliers });
          console.log({ ateliers: res.data.ateliers })
          
        }
      });
    },

  }));
     
    export default useAtelierStore;