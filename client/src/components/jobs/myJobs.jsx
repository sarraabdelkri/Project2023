import useJobStore from "@/store/jobStore";
import { useState,useEffect } from "react";
import { Job } from ".";

export function Jobs({  }) {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const jobs = useJobStore((state) => state.jobs);
  const user = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    fetchJobs();
  }, []);
  
  const handleJobClick = (id) => {
    setSelectedJobId(id);
  };

  const filteredJobs = jobs.filter((job) => job.employer._id === user._id);

  return (
    <ul >
      {filteredJobs.map((job) => (
        <li
          className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300"
          key={job._id}
          onClick={() => handleJobClick(job._id)}
        >
          <Job job={job} />
        </li>
      ))}
    </ul>
  );
}

export default Jobs;
