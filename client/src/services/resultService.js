import API from "./api";

const resultService = {
    getResults: () => {
        return API.get("/result/getResults");
    },
    getResultsByUserId: (userId) => {
        return API.get(`/result/getResultsByUserId/${userId}`);
    }

};

export default resultService;
