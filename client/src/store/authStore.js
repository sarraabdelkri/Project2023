import { create } from "zustand";
import authService from "@/services/authService";

const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: async () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.setItem("id", user._id);
        localStorage.setItem("name", user.name);


        set({ user: null });
    },
    login: async (email, password) => {
        await authService.login(email, password).then((res) => {
            if (res.status == 200) {
                const user = res.data.user;
                const token = res.data.accessToken;
                const enrolledcourses = res.data.user.enrolledcourses
                set({ user: user });
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                localStorage.setItem("id", user._id);
                localStorage.setItem("name", user.name);

                localStorage.setItem("enrolledcourses", JSON.stringify(enrolledcourses));
                return res;
            }
            console.error("Login error");
        });
    },
    signup: async (name, email, password) => {
        await authService.signup(name, email, password).then((res) => {
            return res;
        });
    },
    forgot: async (email) => {
        await authService.forgot(email).then((res) => {
            if (res.status == 200) {
                return res;
            }
            console.error("Forgot error");
        });
    },
    resetPassword: async (token, password) => {
        await authService.resetPassword(token, password).then((res) => {
            if (res.status == 200) {
                return res;
            }
            console.error("Reset password error");
        });
    }
}));

export default useAuthStore;