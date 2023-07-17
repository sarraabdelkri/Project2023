import { useState } from "react";
import { MoreVertical } from "react-feather";
import RowDropdown from "@/shared/components/ui/dropdown/RowDropdown";
import { useNavigate } from "react-router-dom";
import useContractStore from "../../store";
import ContractDeleteModal from "../modals/ContractDeleteModal";

const ContractRow = ({ contract }) => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const removeContract = useContractStore((state) => state.removeContract);

    const deleteContract = async (contract) => {
        await removeContract(contract).then(() => {
            toast.success("Contract deleted successfully");
        });
    };

    return (
        <tr>
            <th>
                <label>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-select"
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </th>
            <td>
                <div className="uppercase">
                    <div className="font-bold">{contract._id.slice(-6)}</div>
                </div>
            </td>
            <td>
                <div className="badge bg-accent/50 badge-sm p-3 mb-2">
                    <span className="text-primary-t">{contract.type}</span>
                </div>
            </td>
            <td>
                <div className="badge bg-emerald-500/50 badge-sm p-3 mb-2">
                    <span className="text-primary-t">{contract.contractstatus}</span>
                </div>
            </td>
            <td>
                <div>
                    <span className="text-primary-t">{contract.user.name}</span>
                </div>
            </td>
            <td>
                <div>
                    <span className="text-primary-t">{contract.job.title}</span>
                </div>
            </td>
            <td>
                <div>
                    <span className="text-primary-t text-xs">{contract.atelier.title}</span>
                </div>
            </td>
            <td>
                <div className="text-gray-500 text-xs">
                    Starts at {contract.startDate.slice(0, 10)}
                </div>
            </td>
            <th>
                <RowDropdown
                    element={
                        <div className="btn btn-ghost btn-xs cursor-pointer">
                            <span className="text-xs font-bold">
                                <MoreVertical size={20} />
                            </span>
                        </div>
                    }
                    onEditClick={() => {
                        navigate(`./edit?id=${contract._id}`);
                    }}
                    onDeleteClick={() => setDeleteModalOpen(true)}
                />
                <ContractDeleteModal
                    contract={contract}
                    openNow={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={() => deleteContract(contract)}
                ></ContractDeleteModal>
            </th>
        </tr >
    );
};

export default ContractRow;
