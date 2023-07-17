import { useEffect } from "react";
import LoadingSpinner from "@components/ui/loading/LoadingSpinner";
import Table from "@components/ui/table/Table";
import useContractStore from "../store";

const ContractsList = () => {
    const contracts = useContractStore((state) => state.contracts);
    const isLoading = useContractStore((state) => state.isLoading);
    const fetchContracts = useContractStore((state) => state.fetchContracts);
    const clearContracts = useContractStore((state) => state.clearContracts);

    useEffect(() => {
        fetchContracts();
        return () => {
            clearContracts();
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner className="mt-20" />
            ) : (
                <Table
                    contracts
                    headers={[
                        "code",
                        "type",
                        "status",
                        "user",
                        "job",
                        "atelier",
                        "start date",
                    ]}
                    items={contracts}
                />
            )}
        </>
    );
};

export default ContractsList;
