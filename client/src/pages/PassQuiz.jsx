import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TakeQuiz } from "@/components/assessment/passAssessment";
export function PassQuiz() {
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
      <AppLayout.Header>Your Assessment</AppLayout.Header>
      <AppLayout.Content>
        <TakeQuiz />
      </AppLayout.Content>
    </AppLayout>
  );
}

export default PassQuiz;
