import useJobStore from "@/store/jobStore";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Job({ job }) {
    const [selectedJobId, setSelectedJobId] = useState(null);
    const date = new Date(job.createdAt);
    const formattedDate = `${date.getDate()} ${date.toLocaleString("en-US", {
        month: "short",
    })} ${date.getFullYear()}`;
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchJobs = useJobStore((state) => state.fetchJobs);
    const jobs = useJobStore((state) => state.jobs);


    const handleJobClick = (id) => {
        setSelectedJobId(id);
    };


    return (
        <Link
            className="w-full"
            to={`/job/${job._id}`}
            onClick={() => handleJobClick(job._id)}
        >
            <div className="flex items-start p-4 sm:p-6 ">
                <div className="mr-2">
                    <div className="relative h-10 w-10">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                            <img
                                className="border-primaryBorder flex h-10 w-10 items-center justify-center rounded-full rounded-full border bg-white bg-cover bg-center bg-no-repeat object-cover transition-opacity hover:opacity-90"
                                src="https://peerlist-media.s3.amazonaws.com/company/foldhealth/logo.png"
                                alt=""
                                width="40"
                                height="40"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="mb-0.5 flex items-center justify-between">
                        <p className="text-base font-medium  ">
                            <span>{job.title} </span>
                            <span className="text-sm font-normal">at {job.employer.company || "X Company"}</span>
                        </p>
                        {user && user._id === job.employer._id && (
                            <div className="flex items-center">
                                <p>Applicants : {job.applied}</p>
                            </div>
                        )}
                    </div>
                    <div className="mb-3 flex flex-wrap items-center">
                        <p className=" mb-1 mr-1 text-xs font-normal capitalize sm:mb-0">
                            {job.workplaceType} ({job.location})
                        </p>
                        <p className=" mb-1 mr-1 text-xs font-normal sm:mb-0">
                            {" "}
                            • {job.jobType}{" "}
                        </p>

                        <p className=" mb-1 text-xs font-normal sm:mb-0"> • {formattedDate}</p>
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
            </div>
        </Link>
    );
}

export default Job;
