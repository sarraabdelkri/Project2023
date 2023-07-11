import { create } from "zustand";
import userService from "@/services/userService";

const useUserStore = create((set, get) => ({
    users: [],
    setUsers: (users) => set({ users }),
    fetchUsers: async () => {
        await userService.getAllUsers().then((res) => {
            if (res.status == 200) {
                set({ users: res.data.users });
                console.log({ users: res.data.users })
            }
        });
    },
    banUser: async (id) => {
        await userService.banUser(id);
    },
    unbanUser: async (id) => {
        await userService.unbanUser(id);
    },
    updateUser: async (id, name, email, password) => {
        await userService.updateUser(id, name, email, password);
    }
}));

export default useUserStore;