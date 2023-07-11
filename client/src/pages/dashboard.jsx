import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersList } from "@/components/users";

export function Dashboard() {
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
        <UsersList />
      </AppLayout.Content>
    </AppLayout>
  );
}

export default Dashboard;
