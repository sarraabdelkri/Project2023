import {
  UserCircleIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import useContractStore from "@/store/contractStore";
import { toast } from "react-toastify";

export function Contract({ contract }) {
  const date = new Date(contract.startDate);
  const date2 = new Date(contract.endDate);
  const date3 = new Date(contract.renewedAt);
  const date4 = new Date(contract.terminatedAt);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const formattedDate2 = `${date2.getDate()}/${
    date2.getMonth() + 1
  }/${date2.getFullYear()}`;
  const formattedDate3 = `${date3.getDate()}/${
    date3.getMonth() + 1
  }/${date3.getFullYear()}`;
  const formattedDate4 = `${date4.getDate()}/${
    date4.getMonth() + 1
  }/${date4.getFullYear()}`;

  const deleteContract = useContractStore((state) => state.deleteContract);

  const fetchContracts = useContractStore((state) => state.fetchContracts);

  const handleClick = async () => {
    if (contract && contract._id !== undefined && contract._id !== null) {
      try {
        await deleteContract(contract._id);
        toast.success("Contract deleted");
      } catch (error) {
        toast.error("Error deleting contract");
      }
    } else {
      toast.error("Contract not found");
    }
    fetchContracts();
  };
  const handleUpdate = async (id, constractstatus) => {
    try {
      await updateContract(id, constractstatus);
      toast.success("Contract updated");
    } catch (error) {
      toast.error("Error updating contract");
    }
    fetchContracts();
  };

  return (
    <div className=" rounded-md bg-gray-100">
      <div className="flex justify-between px-5 py-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <UserCircleIcon className="h-5 w-5 " />
          </div>
          <div className="ml-3">
            <div className="flex gap-2">
              {contract.startDate && (
                <div className="mt-2 text-xs text-gray-500">
                  <p>Account started: {formattedDate}</p>
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-800">
              {contract.endDate && (
                <div className="mt-2 text-xs text-gray-500">
                  <p>Terminated At: {formattedDate2}</p>
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-800">
              <h3>Type: {contract.type}</h3>
            </div>
            <div className="mt-2 text-sm text-gray-800">
              <p> Status :{contract.contractstatus}</p>
            </div>
            <div className="mt-2 text-sm text-gray-800">
              {contract.renewedAt && (
                <div className="mt-2 text-xs text-gray-500">
                  <p>Renewed At: {formattedDate3}</p>
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-800">
              {contract.terminatedAt && (
                <div className="mt-2 text-xs text-gray-500">
                  <p>Cancelled At: {formattedDate4}</p>
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-800">
              <p> User Name :{contract.user.name}</p>
            </div>
            <div className="mt-2 text-sm text-gray-800">
              <p>Job Title: {contract.job.title}</p>
            </div>
          </div>
        </div>
        <div onClick={handleClick}>
          <div className="cursor-pointer text-red-900/50 hover:text-red-900">
            <NoSymbolIcon className="h-5 w-5" title="Ban user" />
          </div>
        </div>
        <button type="button" onClick={handleUpdate}>
          <div className="cursor-pointer text-green-500 hover:text-green-600">
            <NoSymbolIcon className="h-5 w-5" title="Update contract" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Contract;
