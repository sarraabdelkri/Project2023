import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentsList } from "@/components/assessments";

export function DashboardInstructor() {
  const navigate = useNavigate();

  const checkUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/sign-in");
    }
    if (user && user?.role != "instructor") {
      navigate("/");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppLayout>
      <AppLayout.Header>Dashboard Instructor</AppLayout.Header>
      <AppLayout.Content>
        <AssessmentsList />
      </AppLayout.Content>
    </AppLayout>
  );
}

export default DashboardInstructor;
