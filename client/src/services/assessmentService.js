import API from "./api";

const assessmentService = {
    getAllAssessment: () => {
        return API.get("/assessment/getAllAssessment");
    },
    getMyAssessment: (id) => {
        id = localStorage.getItem("id");
        return API.get(`/assessment/getMyAssessment/${id}`);
    },
    getAssessmentsByCourseName: (courseName) => {
        return API.get(`/assessment/getAssessmentsByCourseName/${courseName}`);
    },
    createAssessment: () => {
        let assessment = {
            mustBeSignedIn: mustBeSignedIn,
            name: name,
            questions: questions,
            category: categoryVal,
            imgUrl: imgUrl,
        };

        return API.post("/assessment/createAssessment", {
            assessment,
            createdBy: localStorage.getItem("id"),
        })
    },


}

export default assessmentService;