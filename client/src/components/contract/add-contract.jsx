import { useForm } from "react-hook-form";
import { SecondaryButton } from "@/widgets/buttons";
import { useState } from "react";
import { toast } from "react-toastify";
import useContractStore from "@/store/contractStore";
import useUserStore from "@/store/userStore";
import useAtelierStore from "@/store/atelierStore";
import { Spinner } from "@/widgets";
import { useEffect } from "react";
import useJobStore from "@/store/jobStore";
import axios from "axios";
import { addMonths, isAfter } from "date-fns";
import { saveAs } from "file-saver";
import { useNavigate, useParams } from "react-router-dom";
import { Row } from "react-bootstrap";

// import { AddContracts } from "@/pages";

export function AddContract({ contract }) {
    // const addContract = useContractStore((state) => state.addContract);
    const users = useUserStore((state) => state.users);
    const jobs = useJobStore((state) => state.jobs);
    const ateliers = useAtelierStore((state) => state.ateliers);
    const [isLoading, setLoading] = useState(false);
    const [startDate, setStartdate] = useState("");
    const [endDate, setEnddate] = useState("");
    const [salary, setSalary] = useState("");

    const contracte = useContractStore((state) => state.contract);

    const [contractstatus, setContractstatus] = useState("");
    const [user, setUser] = useState({});
    const [job, setJob] = useState({});
    const [atelier, setAtelier] = useState({});
    const [userId, setUserId] = useState("");
    const [jobId, setJobId] = useState("");
    const [atelierId, setAtelierId] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        const newcontractData = {
            startDate,
            endDate,
            contractstatus,
            salary,
            user,
            job,
            atelier,
        };


        let url = `https://expertise-shaper-37ut.onrender.com/api/contract/contract/${userId}/${jobId}/${atelierId}`;
        let urll = `https://expertise-shaper-37ut.onrender.com/api/contract/fetch-pdf/${userId}/${jobId}/${atelierId}`;

        console.log("url", url);
        console.log("urll", urll);

        axios
            .post(url, newcontractData)
            .then(() =>
                axios.get(urll, {
                    responseType: "blob",
                })
            )
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });

                saveAs(pdfBlob, "contract.pdf");
            });

        setStartdate("");
        setEnddate("");
        setContractstatus("");
        setSalary("");
        setUser("");
        setJob("");
        setAtelier("");
        setUserId("");
        setJobId("");
        setAtelierId("");
    };
    const fetchUsers = useUserStore((state) => state.fetchUsers);

    const fetchJobs = useJobStore((state) => state.fetchJobs);
    const fetchAteliers = useAtelierStore((state) => state.fetchAteliers);

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);
    useEffect(() => {
        fetchAteliers();
    }, []);

    // const handleaddContractClick = () => {
    //     navigateTo(`/contract`);
    // };
    const validateEndDate = (endDate) => {
        const sixMonthsFromStartDate = new Date(startDate);
        sixMonthsFromStartDate.setMonth(sixMonthsFromStartDate.getMonth() + 6);
        if (endDate <= startDate || endDate > sixMonthsFromStartDate) {
            return "End date must be at least 6 months after start date";
        }
        return true;
    };
    return (
        <Row
            style={{
                overflowY: "scroll",
                maxHeight: "550px",
                maxWidth: "640px",
            }}
        >
            <div className="p-6">
                <div className="rounded-lg border border-gray-300">
                    <div className="rounded-t-lg border-b border-gray-300 bg-blue-gray-100/20 p-4 font-medium">
                        Contracts
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                    <label
                        htmlFor="startDate"
                        className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                    >
                        Start Date{" "}
                    </label>
                    <input
                        type="date"
                        className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                        id="startDate"
                        autoComplete="startDate"
                        placeholder="MM/DD/YYYY"
                        data-inputmask="'mask': '99/99/9999'"
                        {...register("startDate", { required: true })}
                        onChange={(e) => {
                            setStartdate(e.target.value);
                        }}
                    />
                </div>
                <div className="mt-1 text-xs font-medium italic text-red-300">
                    {errors.startDate && (
                        <p className="mt-1 text-xs font-medium italic text-red-300">
                            Start Date is required
                        </p>
                    )}
                </div>
                <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                    <label
                        htmlFor="endDate"
                        className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                    >
                        End Date{" "}
                    </label>
                    <input
                        type="date"
                        className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none"
                        id="endDate"
                        autoComplete="endDate"
                        value={endDate}
                        placeholder="MM/DD/YYYY"
                        data-inputmask="'mask': '99/99/9999'"
                        {...register("endDate", {
                            required: "End date is required",
                            validate: validateEndDate,
                            pattern: {
                                value: /^\d{4}-\d{2}-\d{2}$/,
                                message: "End date should be in the format YYYY-MM-DD",
                            },
                        })}
                        onChange={(e) => {
                            setEnddate(e.target.value);
                        }}
                    />

                    <div className="mt-1 text-xs font-medium italic text-red-300">
                        {errors.endDate && (
                            <p className="mt-1 text-xs font-medium italic text-red-300">
                                {errors.endDate.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-1 text-xs font-medium italic text-red-300">
                    {errors.startDate && errors.startDate.message}
                </div>
                <div>
                    <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                        <label
                            htmlFor="contractstatus"
                            className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                        >
                            Contract Status{" "}
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                            id="contractstatus"
                            placeholder="Enter a type"
                            autoComplete="contractstatus"
                            value={contractstatus}
                            {...register("contractstatus", {
                                required: "Status is required",
                            })}
                            onChange={(e) => {
                                setContractstatus(e.target.value);
                            }}
                        />
                    </div>
                    {errors.contractstatus && (
                        <div className="mt-1 text-xs font-medium italic text-red-300">
                            {errors.contractstatus.message}
                        </div>
                    )}
                </div>
                <div>
                    <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                        <label
                            htmlFor="contractstatus"
                            className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                        >
                            Salary{" "}
                        </label>
                        <input
                            type="number"
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                            id="salary"
                            placeholder="Enter a salary"
                            autoComplete="salary"
                            value={salary}
                            {...register("salary", {
                                required: "salary is required",
                            })}
                            onChange={(e) => {
                                setSalary(e.target.value);
                            }}
                        />
                    </div>
                    {errors.salary && (
                        <div className="mt-1 text-xs font-medium italic text-red-300">
                            {errors.salary.message}
                        </div>
                    )}
                </div>
                <div className="" role="none">
                    <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                        <label
                            htmlFor="type"
                            className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                        >
                            Student{" "}
                        </label>

                        <select
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none"
                            id="user"
                            value={user}
                            onChange={(e) => {
                                const selectedUser = users.find(
                                    (user) => user._id === e.target.value
                                );
                                setUser(selectedUser);
                                setUserId(selectedUser._id); // access _id property of user object
                            }}
                        >
                            <option value="">Select a student</option>

                            {users
                                .filter((user) => user.role === "student") // filter users by role
                                .map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                    </option>
                                ))}
                        </select>

                        <button
                            type="button"
                            aria-label="view-password"
                            className="text-light absolute right-0 cursor-pointer px-2 hover:text-primary"
                        ></button>
                    </div>
                    <div className="mt-1 text-xs font-medium italic text-red-300">
                        {errors.user && (
                            <p className="mt-1 text-xs font-medium italic text-red-300">
                                This field is required
                            </p>
                        )}
                    </div>
                </div>
                <div className="" role="none">
                    <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                        <label
                            htmlFor="type"
                            className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                        >
                            Job{" "}
                        </label>
                        <select
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary
            outline-none"
                            id="job"
                            value={job}
                            onChange={(e) => {
                                const selectedjob = jobs.find((job) => {
                                    console.log("--------", e.target.value);
                                    console.log(job._id === e.target.value._id);
                                    return job._id === e.target.value;
                                });
                                console.log(selectedjob);
                                setJob(selectedjob);
                                setJobId(selectedjob._id); // access _id property of user object
                            }}
                        >
                            <option value="">Select a job</option>
                            {jobs.map((job) => (
                                <option key={job._id} value={job._id}>
                                    {job.employer.name}-{job.title} - {job.location} -{" "}
                                    {job.jobType}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            aria-label="view-password"
                            className="text-light absolute right-0 cursor-pointer px-2 hover:text-primary"
                        ></button>
                    </div>
                    <div className="mt-1 text-xs font-medium italic text-red-300">
                        {errors.job && errors.job.message}
                    </div>
                </div>
                <div className="" role="none">
                    <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                        <label
                            htmlFor="type"
                            className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                        >
                            Atlier{" "}
                        </label>

                        <select
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none"
                            id="atelier"
                            value={atelier}
                            onChange={(e) => {
                                const selectedatelier = ateliers.find((atelier) => {
                                    console.log("--------", e.target.value);
                                    console.log(atelier._id === e.target.value._id);
                                    return atelier._id === e.target.value;
                                });
                                console.log(selectedatelier);
                                setAtelier(selectedatelier);
                                setAtelierId(selectedatelier._id); // access _id property of user object
                            }}
                        >
                            <option value="">Select a Atelier</option>

                            {ateliers.map((atelier) => (
                                <option key={atelier._id} value={atelier._id}>
                                    {atelier.title} - {atelier.description} -
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            aria-label="view-password"
                            className="text-light absolute right-0 cursor-pointer px-2 hover:text-primary"
                        ></button>
                    </div>
                    <div className="mt-1 text-xs font-medium italic text-red-300">
                        {errors.atelier && (
                            <p className="mt-1 text-xs font-medium italic text-red-300">
                                This field is required
                            </p>
                        )}
                    </div>
                </div>
                {/* <div className="" role="none">
        <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
          <label
            htmlFor="type"
            className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
          >
            Atelier{" "}
          </label>

          <select
            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none"
            id="atelier"
            value={atelier}
            onChange={(e) => {
              const selectedateliers = Array.from(
                e.target.selectedOptions,
                (option) =>
                  ateliers.find((atelier) => atelier._id === option.value)
              );
              console.log(selectedateliers);
              setAtelier(selectedateliers);
              setAtelier(selectedateliers.map((atelier) => atelier._id)); // access _id property of user object
            }}
            multiple
          >
            <option value="">Select a Atelier</option>

            {ateliers.map((atelier) => (
              <option key={atelier._id} value={atelier._id}>
                {atelier.description}
              </option>
            ))}
          </select>
          <button
            type="button"
            aria-label="view-password"
            className="text-light absolute right-0 cursor-pointer px-2 hover:text-primary"
          ></button>
        </div>
        <div className="mt-1 text-xs font-medium italic text-red-300">
          {errors.atelier && (
            <p className="mt-1 text-xs font-medium italic text-red-300">
              This field is required
            </p>
          )}
        </div>
      </div> */}

                {isLoading && (
                    <div>
                        <Spinner />
                    </div>
                )}
                <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
                <div className="mt-4 flex items-center">
                    <div className="mt-4 flex items-center">
                        <div>
                            <SecondaryButton type="submit" >
                                Save
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
                <br />
            </form>
        </Row>
    );
}

export default AddContract;
