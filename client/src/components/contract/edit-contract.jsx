import { useForm } from "react-hook-form";
import { SecondaryButton } from "@/widgets/buttons";
import { useState } from "react";
import { toast } from "react-toastify";
import useContractStore from "@/store/contractStore";
import { Spinner } from "@/widgets";

export function EditContract({ contract }) {
  const updateContract = useContractStore((state) => state.updateContract);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setLoading] = useState(false);

  const [contractstatus, setContractstatus] = useState(
    contract?.contractstatus
  );

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateContract(id, contractstatus).then(() => {
        toast.success("Contract updated");
        setLoading(false);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4" role="none">
          <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
            <select
              className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none"
              id="contractStatus"
              value={contractstatus}
              onChange={(e) => {
                setContractstatus(e.target.value);
              }}
            >
              <option value="">-- Select Contract Status --</option>
              <option value="terminated">Terminated</option>
              <option value="cancelled">Cancelled</option>
              <option value="renewed">Renewed</option>
            </select>
          </div>

          <div className="mt-1 text-xs font-medium italic text-red-300">
            {errors.contractstatus && errors.contractstatus.message}
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
      </form>
    </div>
  );
}

export default EditContract;
