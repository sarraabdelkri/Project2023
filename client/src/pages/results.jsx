import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Results } from "@/components/results/results";
export function MyResults() {
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
      <AppLayout.Header>Results</AppLayout.Header>
      <AppLayout.Content>
        <Results />
      </AppLayout.Content>
    </AppLayout>
  );
}

export default MyResults;
