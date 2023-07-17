import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContractDetail } from "@/components/contract";

export function DetailContracts() {
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
      <AppLayout.Content>
        <ul className="h-full overflow-scroll">

          <div className="p-6">
            <div className="rounded-lg border border-gray-300">
              <div className="rounded-t-lg border-b border-gray-300 bg-blue-gray-100/20 p-4 font-medium">
                Details Contracts
              </div>
              <ContractDetail />
            </div>
          </div>
        </ul>
      </AppLayout.Content>
    </AppLayout>
  );
}
export default DetailContracts;
