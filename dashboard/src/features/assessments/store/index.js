import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import assessmentService from "../service";

const useAssessmentStore = create((set) => ({
    assessments: [],
    isLoading: false,
    isLoaded: false,
    setAssessments: (assessments) => set({ assessments }),
    removeAssessment: (assessment) =>
        set((state) => ({
            assessments: state.assessments.filter((_assessment) => _assessment._id !== assessment._id),
        })),
    fetchAssessments: async () => {
        set({ isLoading: true });
        const req = await assessmentService
            .getAll()
            .then((data) => {
                set({
                    assessments: data.assessments,
                    isLoading: false,
                    isLoaded: true,
                });
            })
            .catch((err) => {
                set({ isLoading: false });
                throw err;
            });
    },
    clearAssessments: () => set({ assessments: [] }),
}));

// mount store
mountStoreDevtool("assessments", useAssessmentStore);

export default useAssessmentStore;
