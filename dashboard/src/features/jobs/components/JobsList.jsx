import { useEffect } from "react";
import useStore from "@jobs/store";
import LoadingSpinner from "@components/ui/loading/LoadingSpinner";
import Table from "@components/ui/table/Table";

const JobsList = () => {
    const jobs = useStore((state) => state.jobs);
    const isLoading = useStore((state) => state.isLoading);
    const fetchJobs = useStore((state) => state.fetchJobs);
    const clearJobs = useStore((state) => state.clearJobs);

    useEffect(() => {
        fetchJobs();
        return () => {
            clearJobs();
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner className="mt-20" />
            ) : (
                <Table
                    jobs
                    headers={[
                        "job",
                        "type",
                        "location",
                        "workplace",
                        "required skills",
                        "applications",
                        "employer"
                    ]}
                    items={jobs}
                />
            )}
        </>
    );
};

export default JobsList;
