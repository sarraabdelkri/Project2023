import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EditContract } from "@/components/contract";

export function EditContracts() {
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
      <AppLayout.Header> Edit Contracts</AppLayout.Header>
      <AppLayout.Content>
        <div className="p-6">
          <div className="rounded-lg border border-gray-300">
            <div className="rounded-t-lg border-b border-gray-300 bg-blue-gray-100/20 p-4 font-medium">
              Edit Contracts
            </div>
            <div className="p-4">
              <EditContract />
            </div>
          </div>
        </div>
      </AppLayout.Content>
    </AppLayout>
  );
}

export default EditContracts;
