import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate,Link } from "react-router-dom";
import useJobStore from "@/store/jobStore";
import { AppLayout } from "@/widgets/layout";
import { SecondaryButton } from "@/widgets/buttons";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";


export function EditJob() {
    const updateJob = useJobStore((state) => state.updateJob);
    const job = useJobStore((state) => state.job);
    const navigate = useNavigate();
    const { id } = useParams();

    const { register, handleSubmit, watch, formState: { errors }, clearErrors, setValue } = useForm();

    const [title, setTitle] = useState(job.title);
    const [company, setCompany] = useState(job.employer.company);
    const [jobType, setJobType] = useState(job.jobType);
    const [workplaceType, setWorkplaceType] = useState(job.workplaceType);
    const [location, setLocation] = useState(job.location);
    const [requiredSkills, setRequiredSkills] = useState(job.requiredSkills);
    const [aboutJob, setAboutJob] = useState(job.aboutJob);

    const onSubmit = async (data, job) => {
        try {
            await updateJob(job._id, title, workplaceType, location, jobType, requiredSkills, aboutJob);
            toast.success("Job updated");
            navigate(-1);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <AppLayout>
            <AppLayout.Header> 
                <Link
                    to="/jobBoard"
                    className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                    <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                </Link></AppLayout.Header>
            <AppLayout.Content>
                <div className="p-6 h-full overflow-scroll" style={{maxHeight:"670px"}}>
                    <div className="rounded-lg border border-gray-300">
                        <div className="rounded-t-lg border-b border-gray-300 bg-blue-gray-100/20 p-4 font-medium">
                            Edit Job
                        </div>
                        <div className="p-4">
                            <div>
                                <form onSubmit={handleSubmit((data) => onSubmit(data, job))}>
                                    <div className="mb-4" role="none">
                                        <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                                            <label
                                                htmlFor="title"
                                                className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                                            >
                                                Title{" "}
                                            </label>
                                            <input
                                                className="w-full rounded-md bg-white px-2 pb-1 text-sm text- outline-none "
                                                id="title"
                                                type="text"
                                                variant="standard"
                                                {...register('title', { required: "This field is required" })}
                                                value={title}
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="mt-1 text-xs font-medium italic text-red-300">
                                            {errors.title && errors.title.message}
                                        </div>
                                    </div>
                                    <div className="mb-4" role="none">
                                        <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                                            <label
                                                htmlFor="location"
                                                className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                                            >
                                                Location{" "}
                                            </label>
                                            <input
                                                className="w-full rounded-md bg-white px-2 pb-1 text-sm text- outline-none "
                                                id="location"
                                                label="Location"
                                                type="text"
                                                variant="standard"
                                                {...register('location', { required: "This field is required" })}
                                                value={location}
                                                onChange={(e) => {
                                                    setLocation(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="mt-1 text-xs font-medium italic text-red-300">
                                            {errors.location && errors.location.message}
                                        </div>
                                    </div>
                                    <div className="mb-4" role="none">
                                        <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                                            <label
                                                htmlFor="workplaceType"
                                                className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                                            >
                                                workplace Type{" "}
                                            </label>
                                            <select
                                                className="w-full rounded-md bg-white px-2 pb-1 text-sm text- outline-none "
                                                defaultValue={workplaceType}
                                                id="workplaceType"
                                                {...register('workplaceType', { required: "This field is required" })}
                                                onChange={(event) => setValue('workplaceType', event.target.value)}
                                            >
                                                <option value="on-site">On-site</option >
                                                <option value="hybrid">Hybrid</option >
                                                <option value="remote">Remote</option >
                                            </select>
                                        </div>
                                        <div className="mt-1 text-xs font-medium italic text-red-300">
                                            {errors.workplaceType && errors.workplaceType.message}
                                        </div>
                                    </div>
                                    <div className="mb-4" role="none">
                                        <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                                            <label
                                                htmlFor="jobType"
                                                className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                                            >
                                                job Type{" "}
                                            </label>
                                            <select
                                                className="w-full rounded-md bg-white px-2 pb-1 text-sm text- outline-none "
                                                defaultValue={jobType}
                                                id="jobType"
                                                {...register('jobType', { required: "This field is required" })}
                                            >
                                                <option value="full-time">Full-time</option >
                                                <option value="part-time">Part-time</option >
                                                <option value="internship">Internship</option >
                                            </select>
                                        </div>
                                        <div className="mt-1 text-xs font-medium italic text-red-300">
                                            {errors.jobType && errors.jobType.message}
                                        </div>
                                    </div>
                                    <div className="mb-4" role="none">
                                        <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                                            <label
                                                htmlFor="requiredSkills"
                                                className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                                            >
                                                Required Skills{" "}
                                            </label>
                                            <input
                                                className="w-full rounded-md bg-white px-2 pb-1 text-sm text- outline-none "
                                                id="requiredSkills"
                                                type="text"
                                                variant="standard"
                                                {...register('requiredSkills', { required: "This field is required" })}
                                                value={requiredSkills}
                                                onChange={(e) => {
                                                    setRequiredSkills(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="mt-1 text-xs font-medium italic text-red-300">
                                            {errors.requiredSkills && errors.requiredSkills.message}
                                        </div>
                                    </div>
                                    <div className="" role="none">
                                        <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                                            <label
                                                htmlFor="aboutJob"
                                                className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                                            >
                                                About Job{" "}
                                            </label>
                                            <textarea
                                                className="w-full rounded-md bg-white px-2 pb-1 text-sm text- outline-none h-32 resize-none"
                                                id="aboutJob"
                                                type="text"
                                                variant="standard"
                                                {...register('aboutJob', { required: "This field is required" })}
                                                value={aboutJob}
                                                onChange={(e) => {
                                                    setAboutJob(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="mt-1 text-xs font-medium italic text-red-300">
                                            {errors.aboutJob && errors.aboutJob.message}
                                        </div>
                                    </div>
                                    <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
                                    <div className="mt-4 flex items-center">
                                        <div>
                                            <SecondaryButton type="submit">Save</SecondaryButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout.Content>
        </AppLayout>
    )
}
export default EditJob;