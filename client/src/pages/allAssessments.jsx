import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentsList } from "@/components/assessments/allAssessments";

export function AllAssessments() {
  const navigate = useNavigate();

  const checkUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppLayout>
      <AppLayout.Header>All Assessments</AppLayout.Header>
      <AppLayout.Content>
        <AssessmentsList />
      </AppLayout.Content>
    </AppLayout>
  );
}

export default AllAssessments;
