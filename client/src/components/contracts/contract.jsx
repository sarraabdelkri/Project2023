import {
  BriefcaseIcon,
  UserCircleIcon,
  NoSymbolIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "@material-ui/core";
import PrimaryButton from "../../widgets/buttons/primary-button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useContractStore from "@/store/contractStore";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useState } from "react";
import dollaricon from "../../../public/img/money.png";
import utilisateur from "../../../public/img/utilisateur.png";
import emplacement from "../../../public/img/emplacement.png";
import job from "../../../public/img/job-promotion (1).png";
import status from "../../../public/img/status-quo.png";
import table from "../../../public/img/tableur.png";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import contractImage from "../../../assets/images/téléchargement.png";

export function Contract({ contract }) {
  const date = new Date(contract.startDate);
  const date2 = new Date(contract.endDate);
  const date3 = new Date(contract.renewedAt);
  const date5 = new Date(contract.terminatedAt);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1
    }/${date.getFullYear()}`;
  const formattedDate2 = `${date2.getDate()}/${date2.getMonth() + 1
    }/${date2.getFullYear()}`;
  const formattedDate3 = `${date3.getDate()}/${date3.getMonth() + 1
    }/${date3.getFullYear()}`;

  const formattedDate5 = `${date5.getDate()}/${date5.getMonth() + 1
    }/${date5.getFullYear()}`;
  if (contract.contractstatus !== "terminated" && new Date() > date2) {
    contract.contractstatus = "terminated";
  }
  const deleteContract = useContractStore((state) => state.deleteContract);
  const contracts = useContractStore((state) => state.contracts);
  const fetchContracts = useContractStore((state) => state.fetchContracts);

  const handleClick = async () => {
    if (contract && contract._id !== undefined && contract._id !== null) {
      try {
        await deleteContract(contract._id);
        toast.success("Contract deleted");
      } catch (error) {
        toast.error("Error deleting contract");
      }
    } else {
      toast.error("Contract not found");
    }
    fetchContracts();
  };

  const navigateTo = useNavigate();
  const [id, setId] = useState(null);
  const [contractstatus, setContractstatus] = useState("");
  const useName = contracts.map((contract, i) => contract.user?.name);
  const jobTitles = contracts.map((contract, i) => contract.job.title);
  const atelierdescription = contracts.map(
    (contract, i) => contract.atelier?.description
  );
  return (
    <Container>
      <Row>
        <div className="mb-4 ">
          <ul>
            <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300">
              <a className="w-full" href="">
                <div className="mr-2">
                  <div className="relative h-10 w-10"></div>
                </div>
                <div className="ml-3">

                  <Link to={`/detail-contracts/${contract._id}`}>
                    <Button variant="outlined" color="success">Edit</Button>
                  </Link>

                  <div className="flex items-center">
                    <img
                      className="h-40 w-full object-cover"
                      src={contractImage}
                      alt="contract Image"
                    />
                  </div>
                  <div className="mb-2 mt-2  flex gap-2">
                    {contract.startDate && (
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Account started: {formattedDate}</p>
                      </div>
                    )}
                    {contract.endDate && (
                      <div className="mt-2 text-xs text-gray-500">
                        {contract.renewedAt ? (
                          <p>Renewed At: {formattedDate3}</p>
                        ) : (
                          <p>Terminated At: {formattedDate2}</p>
                        )}
                        {contract.renewedAt && (
                          <p>
                            End of Contract:{" "}
                            {new Date(
                              new Date(contract.renewedAt).getTime() +
                              6 * 30 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                    )}

                    {contract.terminatedAt && (
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Cancelled At: {formattedDate5}</p>
                      </div>
                    )}

                  </div>

                  <div className="mb-2 mt-1 flex flex-wrap items-center">

                    <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                      <img
                        alt=" "
                        loading="lazy"
                        width="18"
                        height="18"
                        decoding="async"
                        data-nimg="1"
                        className="mr-1 h-5 w-5 object-cover"
                        src={status}
                      />
                      <span className="capitalize leading-5 lg:inline" />
                      {contractstatus === "terminated"
                        ? "Terminated"
                        : contract.contractstatus}
                    </span>
                    <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                      <img
                        alt=" "
                        loading="lazy"
                        width="18"
                        height="18"
                        decoding="async"
                        data-nimg="1"
                        className="mr-1 h-5 w-5 object-cover"
                        src={table}
                      />
                      <span className="capitalize leading-5 lg:inline" />
                      {contractstatus === "terminated"
                        ? "Terminated"
                        : contract.type}
                    </span>
                    <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                      <img
                        alt=" "
                        loading="lazy"
                        width="18"
                        height="18"
                        decoding="async"
                        data-nimg="1"
                        className="mr-1 h-5 w-5 object-cover"
                        src={dollaricon}
                      />
                      <span className="capitalize leading-5 lg:inline" />
                      {contract.salary} Dt
                    </span>
                  </div>


                  <div className="mb-2 mt-1 flex flex-wrap items-center">

                    <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                      <img
                        alt=" "
                        loading="lazy"
                        width="18"
                        height="18"
                        decoding="async"
                        data-nimg="1"
                        className="mr-1 h-5 w-5 object-cover"
                        src={utilisateur}
                      />
                      <span className="capitalize leading-5 lg:inline" />
                      {contract.user.name}
                    </span>
                    <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                      <img
                        alt=" "
                        loading="lazy"
                        width="18"
                        height="18"
                        decoding="async"
                        data-nimg="1"
                        className="mr-1 h-5 w-5 object-cover"
                        src={job}
                      />
                      <span className="capitalize leading-5 lg:inline" />
                      {contract.job.title}
                    </span>
                    <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                      <img
                        alt=" "
                        loading="lazy"
                        width="18"
                        height="18"
                        decoding="async"
                        data-nimg="1"
                        className="mr-1 h-5 w-5 object-cover"
                        src={emplacement}
                      />
                      <span className="capitalize leading-5 lg:inline" />
                      {contract.job.location}
                    </span>
                    <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                      <img
                        alt=" "
                        loading="lazy"
                        width="18"
                        height="18"
                        decoding="async"
                        data-nimg="1"
                        className="mr-1 h-5 w-5 object-cover"
                        src={job}
                      />
                      <span className="capitalize leading-5 lg:inline" />
                      {contract.job.jobType}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="ml-auto">
                    <div onClick={handleClick}>
                      <div className="cursor-pointer text-red-900/50 hover:text-red-900">
                        <NoSymbolIcon className="h-5 w-5" title="Ban user" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="ml-auto">

                    </div>
                  </div>
                  <div></div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </Row>
    </Container>
  );
}

export default Contract;