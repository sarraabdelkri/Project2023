import { useState } from "react";
import { MoreVertical, Users } from "react-feather";
import RowDropdown from "@/shared/components/ui/dropdown/RowDropdown";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AssessmentDeleteModal from "../modal/AssessmentDeleteModal";
import useAssessmentStore from "../../store";

const AssessmentRow = ({ assessment }) => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const remove = useAssessmentStore((state) => state.removeAssessment);

    const deleteAssessment = async (assessment) => {
        await remove(assessment).then(() => {
            toast.success("Assessment deleted successfully");
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
                        <div className="mask mask-squircle w-12 h-12">
                            <img
                                src={assessment.imgUrl || "/git.jpg"}
                                alt="image"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{assessment.name}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-primary-t text-sm uppercase">{assessment.courseName}</span>
            </td>
            <td>
                <div className="badge bg-accent/50 badge-sm p-3 mb-2 text-xs">
                    <span className="text-primary-t">{assessment.category}</span>
                </div>
            </td>
            <td>
                <div className="badge bg-emerald-500/50 badge-sm p-3 mb-2">
                    <span className="text-primary-t">{assessment.questions.length}</span>
                </div>
            </td>
            <td>
                <span className="text-primary-t text-sm ">{assessment.likes}</span>
            </td>
            <td>
                <span className="text-primary-t text-sm ">{assessment.comments.length}</span>
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
                        navigate(`./edit?id=${assessment._id}`);
                    }}
                    onDeleteClick={() => setDeleteModalOpen(true)}
                />
                <AssessmentDeleteModal
                    assessment={assessment}
                    openNow={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={() => { deleteAssessment(assessment) }}
                ></AssessmentDeleteModal>
            </th>
        </tr>
    );
};

export default AssessmentRow;
