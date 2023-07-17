import { useState } from "react";
import { MoreVertical, Users } from "react-feather";
import RowDropdown from "@/shared/components/ui/dropdown/RowDropdown";
import JobDeleteModal from "../modals/JobDeleteModal";
import useStore from "@jobs/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JobRow = ({ job }) => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const remove = useStore((state) => state.removeJob);

    const deleteJob = async (job) => {
        await remove(job).then(() => {
            toast.success("Job deleted successfully");
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
                <div className="font-bold">{job.title}</div>
                <div className="text-sm opacity-50 lowercase line-clamp-1 cursor-default" title={job.aboutjob}>{job.aboutJob}</div>
            </td>
            <td>
                <div className="badge bg-accent/50 badge-sm p-3 mb-2">
                    <span className="text-primary-t">{job.jobType}</span>
                </div>
            </td>
            <td>
                <span className="text-primary-t text-sm uppercase">{job.location}</span>
            </td>
            <td>
                <div className="badge bg-emerald-500/50 badge-sm p-3 mb-2">
                    <span className="text-primary-t">{job.workplaceType}</span>
                </div>
            </td>
            <td>
                <div className="text-xs text-darker-t">{job.requiredSkills.replaceAll(/\s/g, ', ')}</div>
            </td>
            <td>
                <div className="flex gap-2 items-center badge-sm p-3 mb-2">
                    <span className="text-primary-t">{job.applied}</span>
                    <Users size={16}></Users>
                </div>
            </td>
            <td>
                <div className="text-xs text-darker-t">{job.employer.name}, ({job.employer.company})</div>
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
                        navigate(`./edit?id=${job._id}`);
                    }}
                    onDeleteClick={() => setDeleteModalOpen(true)}
                />
                <JobDeleteModal
                    job={job}
                    openNow={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={() => { deleteJob(job) }}
                ></JobDeleteModal>
            </th>
        </tr>
    );
};

export default JobRow;
