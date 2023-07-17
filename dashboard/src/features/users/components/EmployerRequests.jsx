import Table from "@components/ui/table/Table";
import { useEffect } from "react";
import useStore from "@users/store";
import LoadingSpinner from "@/shared/components/ui/loading/LoadingSpinner";
const EmployerRequests = () => {
    const users = useStore((state) => state.users);
    const isLoading = useStore((state) => state.isLoading);
    const fetchRequests = useStore((state) => state.fetchRequests);
    const clearUsers = useStore((state) => state.clearUsers);

    useEffect(() => {
        fetchRequests();
        return () => {
            clearUsers();
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner className="mt-20" />
            ) : (
                <>
                    <div className="text-xl mb-4 italic">Employers requests</div>
                    <Table
                        employers
                        headers={["user", "company", "linkedin", "actions"]}
                        items={users}
                        noAdd
                    />
                </>
            )}
        </>
    );
};

export default EmployerRequests;
