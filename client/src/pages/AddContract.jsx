import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddContract } from "@/components/contract";

export function AddContracts() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const checkUser = () => {
    if (!user) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppLayout>
      <AppLayout.Header>AddContract</AppLayout.Header>
      <AppLayout.Content>
        <div className="p-6">
          <div className="rounded-lg border border-gray-300">
            <div className="rounded-t-lg border-b border-gray-300 bg-blue-gray-100/20 p-4 font-medium">
              Add Profile
            </div>
            <div className="p-4">
              <AddContract />
            </div>
          </div>
        </div>
      </AppLayout.Content>
    </AppLayout>
  );
}

export default AddContracts;
