import axios from "axios";


const backendUrl = "https://expertise-shaper-37ut.onrender.com/api";


const API = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    error: (error) => {
        if (error) {
            console.error("Api error");
        }
        return Promise.reject(error);
    },
});

export default API;