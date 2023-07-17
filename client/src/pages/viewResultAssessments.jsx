import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ViewResults } from "@/components/assessment/result";
export function ViewResultAssessments() {
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
      <AppLayout.Header>Assessment Result</AppLayout.Header>
      <AppLayout.Content>
        <ViewResults />
      </AppLayout.Content>
    </AppLayout>
  );
}

export default ViewResultAssessments;
