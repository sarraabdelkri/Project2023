import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/widgets/layout";
import useJobStore from "@/store/jobStore";
import axios from "axios";
import useApplicationStore from "@/store/applicationStore";
import Applicant from "../../../../client/src/components/jobs/applicant";

export function JobApplicants() {
    const { id } = useParams();
    const [applicants, setApplicants] = useState([]);
    const getJobById = useJobStore((state) => state.getJobById);
    const job = useJobStore((state) => state.job);
    const fetchApplicationsByJobId = useApplicationStore(
        (state) => state.fetchApplicationsByJobId
    );
    const applications = useApplicationStore((state) => state.applications);

    useEffect(() => {
        const fetchApplicants = async () => {
            const response = await fetchApplicationsByJobId(id);
            setApplicants(response);
        };
        fetchApplicants();
    }, [fetchApplicationsByJobId, id]);

    return (
        <>
            <AppLayout>
                <AppLayout.Header>
                    <h1 className="text-xl font-bold ">
                        Applicants for {job && job.title}
                    </h1>
                </AppLayout.Header>
                <AppLayout.Content>

                    {/* <div>
                                {applications &&
                                    applications.map((applicant) => (
                                        <div key={applicant._id}>
                                            <p>{applicant.student.name}</p>
                                            <p>{applicant.student.email}</p>
                                            <p>{applicant.status}</p>
                                        </div>
                                    ))}
                            </div> */}
                    <div className="h-full overflow-scroll px-6 pt-4 pb-10">
                        <div>
                            {applications &&
                                applications.map((applicant) => (
                                    <div className="mb-3" key={applicant._id}>
                                        <Applicant applicant={applicant} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </AppLayout.Content>

            </AppLayout>
        </>
    );
}

export default JobApplicants;
