import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAssessment } from "@/components/assessment/createAssessment";
export function CreateQuiz() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const checkUser = () => {
    if (!user) {
      navigate("/sign-in");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppLayout>
      <AppLayout.Header>Add Quiz</AppLayout.Header>
      <AppLayout.Content>
        <CreateAssessment />
      </AppLayout.Content>
    </AppLayout>
  );
}

export default CreateQuiz;
