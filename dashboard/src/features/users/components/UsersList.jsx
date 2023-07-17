import Table from "@components/ui/table/Table";
import { useEffect } from "react";
import useStore from "@users/store";
import LoadingSpinner from "@/shared/components/ui/loading/LoadingSpinner";
import { Link } from "react-router-dom";
const UsersList = () => {
    const users = useStore((state) => state.users);
    const isLoading = useStore((state) => state.isLoading);
    const fetchUsers = useStore((state) => state.fetchUsers);
    const clearUsers = useStore((state) => state.clearUsers);

    useEffect(() => {
        fetchUsers();
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
                    <Link to="/users/employer-requests" className="w-full flex justify-end">
                        <div className="p-3 bg-white/5 rounded-md hover:bg-white/10 ">Employers requests</div>
                    </Link>
                    <Table
                        users
                        headers={["user", "role & status", "date joined", "ban"]}
                        items={users}
                        noAdd
                    />
                </>
            )}
        </>
    );
};

export default UsersList;
