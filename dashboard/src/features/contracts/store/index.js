import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import contractService from "../service";

const useContractStore = create((set) => ({
    contracts: [],
    isLoading: false,
    isLoaded: false,
    setContracts: (contracts) => set({ contracts }),
    removeContract: (contract) =>
        set((state) => ({
            contracts: state.contracts.filter((_contract) => _contract._id !== contract._id),
        })),
    fetchContracts: async () => {
        set({ isLoading: true });
        const req = await contractService
            .getAll()
            .then((data) => {
                set({
                    contracts: data.contracts,
                    isLoading: false,
                    isLoaded: true,
                });
            })
            .catch((err) => {
                set({ isLoading: false });
                throw err;
            });
    },
    clearContracts: () => set({ contracts: [] }),
}));

// mount store
mountStoreDevtool("contracts", useContractStore);

export default useContractStore;
