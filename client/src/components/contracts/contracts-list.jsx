import { useEffect } from "react";
import useContractStore from "@/store/contractStore";
import { Contract } from ".";


export function ContractsList() {
  const fetchContracts = useContractStore((state) => state.fetchContracts);
  const contracts = useContractStore((state) => state.contracts);

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div className="h-full overflow-scroll px-6 pt-4 pb-10">
      <div className="mb-6 text-sm font-medium uppercase">Contracts list</div>

      {contracts.map((contract, i) => {
        return (
          <div className="mb-3" key={i}>
            <Contract contract={contract} />
          </div>
        );
      })}
    </div>
  );
}

export default ContractsList;
