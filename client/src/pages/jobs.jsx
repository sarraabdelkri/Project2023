import { AppLayout } from "@/widgets/layout";
import { Job } from "@/components/jobs";
import useJobStore from "@/store/jobStore";
import { useEffect } from "react";
import ReactGA from "react-ga";

export function JobsPage() {
    const fetchJobs = useJobStore((state) => state.fetchJobs);
    const jobs = useJobStore((state) => state.jobs);

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <AppLayout>
            <AppLayout.Header>All jobs</AppLayout.Header>
            <AppLayout.Content>
                <ul className="h-full overflow-scroll">
                    {jobs.map((job, i) => {
                        return (
                            <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300" key={i}>
                                <Job job={job} />
                            </li>
                        );
                    }
                    )}
                </ul>
            </AppLayout.Content>
        </AppLayout>
    );
}

export default JobsPage;
