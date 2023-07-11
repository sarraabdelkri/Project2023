import { useForm } from "react-hook-form";
import { SecondaryButton } from "@/widgets/buttons";
import { useState } from "react";
import { toast } from "react-toastify";
import useContractStore from "@/store/contractStore";
import useUserStore from "@/store/userStore";
import { Spinner } from "@/widgets";
import PDF from "./pdf";
import { useEffect } from "react";
import useJobStore from "@/store/jobStore";
import axios from "axios";

export function AddContract({ contract }) {
  const addContract = useContractStore((state) => state.addContract);
  const users = useUserStore((state) => state.users);
  const jobs = useJobStore((state) => state.jobs);
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartdate] = useState(contract?.startDate);
  const [endDate, setEnddate] = useState(contract?.endDate);
  const [type, setType] = useState(contract?.type);
  const [contractstatus, setContractstatus] = useState(
    contract?.contractstatus
  );
  const [user, setUser] = useState(contract?.user);
  const [job, setJob] = useState(contract?.job);

  // const addContract = async (startDate, endDate, type, user, job) => {
  //   try {
  //     const userId = user?.id; // vérifier que user existe avant de lire sa propriété id
  //     const jobId = job?.id; // vérifier que job existe avant de lire sa propriété id

  //     const contractData = {
  //       startDate,
  //       endDate,
  //       type,
  //       user,
  //       job,
  //     };
  //     console.log(contractData);

  //     const response = await axios.post(
  //       `http://localhost:9000/contract/contracts/${userId}/${jobId}`,
  //       contractData
  //     );
  //     console.log(response);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     throw error.response?.data?.message || "Something went wrong.";
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newcontractData = {
      startDate,
      endDate,
      type,
      user,
      job,
    };
    addContract(newcontractData);
    setStartdate("");
    setEnddate("");
    setType("");
    setUser("");
    setJob("");
  };
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  const fetchJobs = useJobStore((state) => state.fetchJobs);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4" role="none">
          <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
            <label
              htmlFor="name"
              className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
            >
              Start Date{" "}
            </label>
            <input
              type="date"
              className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
              id="startDate"
              autoComplete="startDate"
              value={startDate}
              onChange={(e) => {
                setStartdate(e.target.value);
              }}
            />
          </div>
          <div className="mt-1 text-xs font-medium italic text-red-300">
            {/* {errors.startDate && errors.startDate.message} */}
          </div>
        </div>
        <div className="mb-4" role="none">
          <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
            <label
              htmlFor="endDate"
              className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
            >
              End Date{" "}
            </label>
            <input
              type="date"
              className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
              id="endDate"
              autoComplete="endDate"
              value={endDate}
              onChange={(e) => {
                setEnddate(e.target.value);
              }}
            />
          </div>
          <div className="mt-1 text-xs font-medium italic text-red-300"></div>
        </div>
        <div className="" role="none">
          <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
            <label
              htmlFor="type"
              className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
            >
              Type{" "}
            </label>
            <input
              type="text"
              className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
              id="type"
              placeholder="Enter a type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
            <button
              type="button"
              aria-label="view-password"
              className="text-light absolute right-0 cursor-pointer px-2 hover:text-primary"
            ></button>
          </div>
          <div className="mt-1 text-xs font-medium italic text-red-300">
            {/* {errors.type && errors.type.message} */}
          </div>
        </div>
        <div className="" role="none">
          <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
            <label
              htmlFor="type"
              className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
            >
              User{" "}
            </label>
            <select
              className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none"
              id="user"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            >
              <option value="">Select a user</option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
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
            {/* {errors.user && errors.user.message} */}
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
              className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none"
              id="job"
              value={job}
              onChange={(e) => {
                setJob(e.target.value);
              }}
            >
              <option value="">Select a job</option>

              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
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
            {/* {errors.job && errors.job.message} */}
          </div>
        </div>
        {isLoading && (
          <div>
            <Spinner />
          </div>
        )}
        <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
        <div className="mt-4 flex items-center">
          <div>
            <SecondaryButton type="submit">Save</SecondaryButton>
          </div>
        </div>
        <br />
        <PDF
          className="ml-4"
          contract={{
            startDate,
            endDate,
            type,
            user,
            job,
          }}
        />
      </form>
    </div>
  );
}

export default AddContract;
