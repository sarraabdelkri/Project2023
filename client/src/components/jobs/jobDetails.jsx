import { AppLayout } from "@/widgets/layout";
import useJobStore from "@/store/jobStore";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "@/widgets/buttons";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from "axios";
import notificationStore from "@/store/notificationStore";
import { BeatLoader } from "react-spinners";
import { SocialShareButtons } from "./SocialShareButtons";

export function JobDetails() {
    const getJobById = useJobStore((state) => state.getJobById);
    const job = useJobStore((state) => state.job);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const { id } = useParams();
    const { sendNotification } = notificationStore();
    const userId = user._id;

    useEffect(() => {
        (async () => {
            const courseData = await getJobById(id);
        })();
    }, [getJobById, id]);

    if (!job) {
        return (
            <div className="flex h-screen items-center justify-center">
                <BeatLoader color="#1E9645" size={20} />
            </div>
        );
    }

    const date = new Date(job.createdAt);
    const formattedDate = `${date.getDate()} ${date.toLocaleString("en-US", {
        month: "short",
    })} ${date.getFullYear()}`;

    const handleDelete = () => {
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        useJobStore.getState().deleteJob(job._id);
        toast.success("Job deleted successfully");
        navigate("/");
        setShowDeleteDialog(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteDialog(false);
    };

    const handleApply = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        try {
            const response = await axios.post(
                `https://expertise-shaper-37ut.onrender.com/api/application/apply/${job._id}`,
                {},
                config
            );
            toast.success("Applied successfully");
            await sendNotification(
                userId,
                `You applied for ${job.title}`
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AppLayout>
            <AppLayout.Header>
                <Link
                    to="/jobs"
                    className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                    <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                </Link>
            </AppLayout.Header>
            <AppLayout.Content>
                <div className="h-full overflow-scroll px-6 pt-4 pb-10 p-4 lg:p-6 min-h-screen lg:min-h-[calc(100vh-132px)]">
                    <div className="border border-primaryBorder rounded-lg p-4 bg-orange-mist mb-6 ">
                        <div className="mb-2 flex items-center justify-between">
                            <div className="w-12 h-12 relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        className="border-primaryBorder flex h-12 w-12 items-center justify-center rounded-full rounded-full border bg-white bg-cover bg-center bg-no-repeat object-cover transition-opacity hover:opacity-90"
                                        src="https://peerlist-media.s3.amazonaws.com/company/foldhealth/logo.png"
                                        alt=""
                                        width="100"
                                        height="100"
                                    />
                                </div>

                            </div>
                            {user && user.role === "student" && (
                                <div className="flex items-center">
                                    <PrimaryButton onClick={() => handleApply()}>Apply</PrimaryButton>
                                </div>
                            )} {user && user._id === job.employer._id && (
                                <div className="flex items-center">
                                    {job.applied > 0 && (
                                        <Link to={`/job/${job._id}/applicants`}>
                                            <Button variant="outlined" color="secondary">Applicants -{job.applied}-</Button>
                                        </Link>
                                    )}
                                    &nbsp;
                                    <Link to={`/job/${job._id}/edit`}>
                                        <Button variant="outlined" color="success">Edit</Button>
                                    </Link>
                                    &nbsp;
                                    <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
                                </div>
                            )}

                        </div>
                        <div className="pb-4 border-b border-primaryBorder">
                            <p style={{ fontSize: "18px" }} className="mb-2 text font-semibold capitalize text-base mb-0.5">{job.title} </p>
                            <div className="mb-3 flex flex-wrap items-center">
                                <p className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                    at {job.employer.company}
                                </p>
                                <p className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                    {" "}
                                    • {job.jobType}
                                    {" "}
                                </p>

                                <p className=" mr-1 text-xs font-normal capitalize sm:mb-0"> • {job.workplaceType} ({job.location})</p>
                            </div>
                            <div className="mt-2 hidden lg:block">
                                <div className="mt-1 flex flex-wrap items-start">
                                    {job.requiredSkills.split(' ').map((skill) => (
                                        <span key={skill.trim()} className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                                            <img
                                                alt=" "
                                                loading="lazy"
                                                width="16"
                                                height="16"
                                                decoding="async"
                                                data-nimg="1"
                                                className="mr-1 h-4 w-4 object-cover"
                                                src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${skill.trim()}.svg`}
                                            />
                                            <span className="capitalize leading-5 lg:inline">
                                                {skill.trim()}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex pt-4 border-t border-primaryBorder">
                            <p className="text- font-normal text-xs text-gray mb-0.5">
                                posted by &nbsp;
                            </p>
                            <p className="mr-1 text- font-medium text-xs ">
                                {job.employer.name}
                            </p>
                            <p className=" mr-1 text-xs font-medium capitalize sm:mb-0">
                                {" "}
                                • {formattedDate}
                                {" "}
                            </p>
                        </div>
                    </div>
                    <div className="mb-10">
                        <p className="text font-semibold text-base mb-4"> About this opportunity</p>
                        <div className="text-sm font-normal">
                            <p>{job.aboutJob}</p>
                        </div>
                    </div>
                    <div className="mb-10">
                        <p className="text font-semibold text-base mb-4"> Share on</p>
                        <SocialShareButtons
                            url={encodeURIComponent(`http://127.0.0.1:5173/job/${job._id}`)}
                            title={job.title} />
                    </div>
                </div>

            </AppLayout.Content>
            {/* Delete Dialog */}
            <Dialog open={showDeleteDialog} onClose={handleCancelDelete}>
                <DialogTitle>Delete Job</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this job?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </AppLayout>
    );
}

export default JobDetails;