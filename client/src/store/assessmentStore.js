import { create } from "zustand";
import assessmentService from "@/services/assessmentService";

const useAssessmentStore = create((set, get) => ({
    assessments: [],
    setAssessments: (assessments) => set({ assessments }),
    fetchAssessments: async () => {
        await assessmentService.getAllAssessment().then((res) => {
            if (res.status == 200) {
                set({ assessments: res.data.assessments });
            }
        });
    },
    fetchMyAssessment: async () => {
        const id = localStorage.getItem("id");
        const res = await assessmentService.getMyAssessment(id);
        if (res.status === 200) {
            set({ assessments: res.data.assessment });
        }
    },
    createAssessment: async (assessmentData) => {
        const res = await assessmentService.createAssessment(assessmentData);
        if (res.status === 200) {
            console.log(res.data);
        }
    },

    getAssessmentsByCourseName: async (courseName) => {
        const res = await assessmentService.getAssessmentsByCourseName(courseName);
        if (res.status === 200) {
            const assessment = res.data.assessment;
            set({ assessment });
            return assessment;
        } else {
            console.error("Failed to fetch quiz");
            return null;
        }
    },
}));

export default useAssessmentStore;