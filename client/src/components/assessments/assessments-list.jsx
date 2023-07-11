import { useEffect } from "react";
import useAssessmentStore from "@/store/assessmentStore";
import { Assessment } from ".";

export function AssessmentsList() {
  const fetchMyAssessment = useAssessmentStore(
    (state) => state.fetchMyAssessment
  );
  const assessments = useAssessmentStore((state) => state.assessments);

  useEffect(() => {
    fetchMyAssessment();
  }, []);
  return (
    <div className="h-full overflow-scroll px-6 pb-10 pt-4">
      <div className="mb-6 text-sm font-medium uppercase">Assessments list</div>
      {assessments.map((assessment, i) => {
        return (
          <div className="mb-3" key={i}>
            <Assessment assessment={assessment} />
          </div>
        );
      })}
    </div>
  );
}

export default AssessmentsList;
