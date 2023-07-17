import { useEffect } from "react";
import LoadingSpinner from "@components/ui/loading/LoadingSpinner";
import Table from "@components/ui/table/Table";
import useAssessmentStore from "../store";

const AssessmentsList = () => {
    const assessments = useAssessmentStore((state) => state.assessments);
    const isLoading = useAssessmentStore((state) => state.isLoading);
    const fetchAssessments = useAssessmentStore((state) => state.fetchAssessments);
    const clearAssessments = useAssessmentStore((state) => state.clearAssessments);

    useEffect(() => {
        fetchAssessments();
        return () => {
            clearAssessments();
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner className="mt-20" />
            ) : (
                <Table
                    assessments
                    headers={[
                        "assessment",
                        "course name",
                        "category",
                        "questions",
                        "likes",
                        "comments",
                    ]}
                    items={assessments}
                />
            )}
        </>
    );
};

export default AssessmentsList;
