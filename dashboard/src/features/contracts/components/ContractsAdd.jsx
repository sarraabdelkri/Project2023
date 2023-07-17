import { useState } from "react";
import { toast } from "react-toastify";
import useJobsStore from "../store";
import useUsersStore from "@/features/users/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useContractStore from "../store";

const JobsAdd = () => {
    const navigate = useNavigate();
    const addJob = useContractStore((state) => state.addJob);
    const fetchUsers = useUsersStore((state) => state.fetchUsers);
    const employers = useUsersStore((state) => state.users.filter((user) => user.role === "employer"));
    useEffect(() => {
        fetchUsers();
    }, [])

    const handleSubmit = () => {
        setError("");
        if (
            !job.title ||
            !job.aboutJob ||
            !job.jobType ||
            !job.location ||
            !job.workplaceType ||
            !job.requiredSkills
        ) {
            setError("Please fill all fields");
            return;
        }
        addJob(job).then(() => {
            toast.success("Contract added successfully");
            navigate("/contracts");
        });
    };

    const [error, setError] = useState("");

    const [job, setJob] = useState({
        title: "",
        aboutJob: "",
        jobType: "full-time",
        location: "",
        workplaceType: "on-site",
        requiredSkills: "",
    });

    return (
        <div>
            <h1 className="text-xl font-bold">Add job</h1>
            <div className="mt-6 flex flex-col gap-4">
                <div>
                    <div className="mb-1 text-darker-t">Title</div>
                    <input
                        type="text"
                        placeholder="Title"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setJob({ ...job, title: e.target.value })}
                    />
                </div>
                <div>
                    <div className="mb-1 text-darker-t">About</div>

                    <textarea
                        type="text"
                        placeholder="About"
                        className="p-3 outline-none bg-secondary rounded-md w-96 min-h-[150px]"
                        onChange={(e) => setJob({ ...job, aboutJob: e.target.value })}
                    />
                </div>
                <div>
                    <div className="mb-1 text-darker-t">Job type</div>
                    <select
                        type="text"
                        placeholder="Type"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setJob({ ...job, jobType: e.target.value })}
                    >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                    </select>
                </div>
                <div>
                    <div className="mb-1 text-darker-t">Location</div>
                    <input
                        type="text"
                        placeholder="Location"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setJob({ ...job, location: e.target.value })}
                    />
                </div>
                <div>
                    <div className="mb-1 text-darker-t">Workplace type</div>
                    <select
                        type="text"
                        placeholder="Workplace"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setJob({ ...job, workplaceType: e.target.value })}
                    >
                        <option value="on-site">On site</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="remote">Remote</option>
                    </select>
                </div>
                <div >
                    <div className="mb-1 text-darker-t">Required skills</div>
                    <input
                        type="text"
                        placeholder="Skills"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setJob({ ...job, requiredSkills: e.target.value })}
                    />
                </div>
                <div>
                    <div className="mb-1 text-darker-t">Employer</div>
                    <select
                        type="text"
                        placeholder="Employer"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setJob({ ...job, employer: e.target.value })}
                    >
                        {employers.map((user) => {
                            return (
                                <option key={user._id} value={user._id}>
                                    {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {error && (
                    <div>
                        <p className="text-red-400 text-sm italic font-medium">{error}</p>
                    </div>
                )}
                <div>
                    <button
                        className="py-3 px-6 rounded-md flex items-center bg-emerald-500/80 hover:bg-emerald-500/60"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div >
    );
};

export default JobsAdd;
