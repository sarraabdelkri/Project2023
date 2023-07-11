import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContractsList } from "@/components/contracts";

export function Contract() {
  const navigate = useNavigate();

  const checkUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/sign-in");
    }
    if (user && user?.role != "admin") {
      navigate("/jobs");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppLayout>
      <AppLayout.Header>Dashboard</AppLayout.Header>
      <AppLayout.Content>
        <ContractsList />
      </AppLayout.Content>
    </AppLayout>
  );
}

export default Contract;
