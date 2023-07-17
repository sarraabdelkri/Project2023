import axios from "axios";
import { AppLayout } from "@/widgets/layout";
import { useEffect, useState } from "react";
import { OtherJob } from "@/components/jobs";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

export function OtherJobsPage() {
    const list = useRef(null);
    const [newJobs, setNewJobs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [start, setStart] = useState(0);

    const fetchJobs = async () => {
        setFetching(true);
        await axios.get(`https://expertise-shaper-37ut.onrender.com/api/other-jobs/li?start=${start}`).then((res) => {
            setNewJobs(res.data.jobs);
        }).then(() => {
        }).finally(() => setFetching(false));
    };

    useEffect(() => {
        if (newJobs.length > 0) { setJobs([...jobs, ...newJobs]); setStart(start + 30) };

    }, [newJobs]);

    useEffect(() => {
        fetchJobs();
        // on scroll
        const scroll = list.current.addEventListener("scroll", () => {
            if (list.current.scrollTop + list.current.clientHeight >= list.current.scrollHeight - 200 && !isFetching) {
                fetchJobs();
            }
        });
    }, []);

    return (
        <AppLayout>
            <AppLayout.Header>
                <div className="flex items-center">
                    <Link
                        to="/jobs"
                        className="flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                        <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                    </Link> <span className="ml-2"> Other jobs</span>
                </div></AppLayout.Header>
            <AppLayout.Content>
                <ul className="h-full overflow-scroll jobs-list" ref={list}>
                    {jobs.map((job, i) => {
                        return (
                            <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300" key={i}>
                                <OtherJob job={job} />
                            </li>
                        );
                    }
                    )}
                </ul>
            </AppLayout.Content>
        </AppLayout>
    );
}

export default OtherJobsPage;
