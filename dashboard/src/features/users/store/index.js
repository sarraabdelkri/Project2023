import { create } from "zustand";
import userService from "@users/service";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useUsersStore = create((set) => ({
    users: [],
    isLoading: false,
    isLoaded: false,
    setUsers: (users) => set({ users }),
    removeUser: (id) =>
        set((state) => ({
            users: state.users.filter((user) => user._id !== id),
        })),
    fetchUsers: async () => {
        set({ isLoading: true });
        const req = await userService
            .getAll()
            .then((data) => {
                set({ users: data.users, isLoading: false, isLoaded: true });
            })
            .catch((err) => {
                set({ isLoading: false });
                throw err;
            });
    },
    clearUsers: () => set({ users: [] }),
    banUser: async (user) => {
        const req = await userService.ban(user._id).then((data) => {
            set((state) => ({
                users: state.users.map((_user) => {
                    if (_user._id === user._id) {
                        _user.banned = true;
                    }
                    return _user;
                }),
            }));
        });
    },
    unbanUser: async (user) => {
        const req = await userService.unban(user._id).then((data) => {
            set((state) => ({
                users: state.users.map((_user) => {
                    if (_user._id === user._id) {
                        _user.banned = false;
                    }
                    return _user;
                }),
            }));
        });
    },
    fetchRequests: async () => {
        set({ isLoading: true });
        const req = await userService
            .getEmpRequests()
            .then((data) => {
                set({ users: data.users, isLoading: false, isLoaded: true });
            })
            .catch((err) => {
                set({ isLoading: false });
                throw err;
            });
    },
    approveRequest: async (user) => {
        const req = await userService.approve(user._id).then((data) => {
            set((state) => ({
                users: state.users.filter((_user) => _user._id !== user._id),
            }));
        });
    },
    declineRequest: async (user) => {
        const req = await userService.decline(user._id).then((data) => {
            set((state) => ({
                users: state.users.filter((_user) => _user._id !== user._id),
            }));
        });
    }
}));

// mount store
mountStoreDevtool("users", useUsersStore);

export default useUsersStore;
