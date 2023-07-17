import { useState } from "react";
import { MoreVertical, CheckCircle, XOctagon, UserCheck, User, Linkedin, CheckSquare, Check } from "react-feather";
import useStore from "@users/store";
import { toast } from "react-toastify";

const EmployerRow = ({ user }) => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const approve = useStore((state) => state.approveRequest);
    const decline = useStore((state) => state.declineRequest);

    const approveRequest = (user) => {
        approve(user).then(() => {
            toast.success("Employer request approved");
        });
    };

    const declineRequest = (user) => {
        decline(user).then(() => {
            toast.success("Employer request declined");
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
                <div className="flex items-center space-x-3">
                    <div className="avatar cursor-pointer">
                        <User size={16}></User>
                    </div>
                    <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50 lowercase">{user.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <div className="badge bg-accent/50 badge-sm p-3 mb-2">
                    <span className="text-primary-t">{user.company}</span>
                </div>
            </td>
            <td>
                <div className="p-3 mb-2">
                    <a href={user.linkedinUrl} target="_blank" className="text-primary-t"><Linkedin className="text-blue-500 hover:text-blue-700"></Linkedin></a>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-2">

                    <div
                        className="text-emerald-400 cursor-pointer hover:text-emerald-500"
                        onClick={() => {
                            approveRequest(user);
                        }}
                    >
                        <Check size={20} />
                    </div>

                    <div
                        className="text-red-400 cursor-pointer hover:text-red-500"
                        onClick={() => {
                            declineRequest(user);
                        }}
                    >
                        <XOctagon size={20} />
                    </div>
                </div>

            </td>
        </tr>
    );
};

export default EmployerRow;
