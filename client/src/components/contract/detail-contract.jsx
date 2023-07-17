import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    BriefcaseIcon,
    UserCircleIcon,
    NoSymbolIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
    FormGroup,
    FormControl,
    InputLabel,
    Input,
    Button,
    styled,
    Typography,
    Select,
    MenuItem,
} from "@mui/material";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useContractStore from "@/store/contractStore";
import Card from "react-bootstrap/Card";
import PrimaryButton from "../../widgets/buttons/primary-button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import contracter from "../../../public/img/contracter.png";
import { toast } from "react-toastify";
import contractService from "@/services/contractService";
import { Link } from "react-router-dom";
// import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// import notificationStore from "@/store/notificationStore";

export function ContractDetail() {

    const [contract, setContract] = useState("");
    const { id } = useParams();
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
    const theme = createTheme({
        palette: {
            primary: {
                main: "#4CAF50",
            },
        },
    });
    const fetchContracts = useContractStore((state) => state.fetchContracts);
    const updateContract = useContractStore((state) => state.updateContract);
    const [contractstatus, setContractstatus] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [opens, setOpens] = useState(false);
    const handleClosee = async () => {
        const response = await contractService.getcontractById(id);
        setContract(response.data.contract);
        setOpens(false);
        window.location.reload();
    };
    const handleClickOpenss = (id, contractstatus) => {

        setContractstatus(contractstatus);
        setOpens(`/edit-contracts/${id}`);
    };
    const handleClose = async () => {
        const response = await contractService.getcontractById(id);
        setContract(response.data.contract);
        setOpens(false);
        window.location.reload(false);
    };


    useEffect(() => {
        if (!contract) {
            const url = `https://expertise-shaper-37ut.onrender.com/api/contract/${id}`;

            const fetchContract = async () => {
                const response = await axios.get(url);
                setContract(response.data.contract);
            };
            fetchContract();
        }
    }, [contract, id]);

    const onSubmitt = async () => {
        await updateContract(id, contractstatus);
        handleClosee();
        window.location.reload();
    };


    // const onSubmitt = async () => {
    //   await updateContract(id, contractstatus);
    //   const updatedContract = await contractService.getContract(id);
    //   setContract(updatedContract);
    // };

    return (

        <div className="h-full px-6 pb-10 pt-4">
            <Row>
                <Col>
                    <Card
                        style={{
                            width: "35rem",
                            backgroundColor: "",
                            borderColor: "",
                        }}
                    >
                        <Card.Body>

                            <Col>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div className="mr-2">
                                        <img
                                            alt=" "
                                            loading="lazy"
                                            width="30"
                                            height="30"
                                            decoding="async"
                                            data-nimg="1"
                                            className="object-cover"
                                            src={contracter}
                                        />
                                    </div>

                                </div>
                                <hr />

                                <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                    Status: {contract.contractstatus}
                                </Card.Text>
                                <hr />
                                <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                    Type: {contract.type}
                                </Card.Text>
                                <hr />{" "}
                                <small>
                                    <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                        Start Date: {formattedDate}
                                    </Card.Text>{" "}
                                </small>
                                <hr />{" "}
                                <small>
                                    <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                        End Date: {formattedDate2}
                                    </Card.Text>{" "}
                                </small>
                                <hr />{" "}
                                <small>
                                    <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                        Salary: {contract.salary}
                                    </Card.Text>{" "}
                                </small>
                                <hr />{" "}
                                <small>
                                    <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                        Student : {contract.user?.name}
                                    </Card.Text>{" "}
                                </small>
                                <hr />{" "}
                                <small>
                                    <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                        Title : {contract.job?.title}
                                    </Card.Text>{" "}
                                </small>
                                <hr />{" "}
                                <small>
                                    <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                        Job Type : {contract.job?.jobType}
                                    </Card.Text>{" "}
                                </small>
                                <hr />{" "}
                                <small>
                                    {contract.renewedAt && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            <p>Renewed At: {formattedDate3}</p>
                                        </div>
                                    )}
                                </small>
                                <hr />{" "}
                                <small>
                                    {contract.terminatedAt && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            <p>Cancelled At: {formattedDate5}</p>
                                        </div>
                                    )}
                                </small>
                            </Col>

                        </Card.Body>
                    </Card>
                    <Row>
                        <div className="mb-10 mt-10">
                            <p className="text mb-4 text-base font-semibold">
                                {" "}
                                Article
                            </p>

                            <div className="text-sm font-normal">


                                <p>{contract.atelier?.title}</p>
                                <p>{contract.atelier?.description}</p>

                            </div>
                        </div>
                    </Row>

                </Col>


            </Row >

            <PrimaryButton
                width="100"
                onClick={() => handleClickOpenss(contract._id, contract)}
            >
                Edit
            </PrimaryButton>
            <br />
            <Link to={`/pdfContract`}>
                <Button variant="outlined" color="success">Downlowd You Contract  </Button>
            </Link>
            <Dialog
                open={opens}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                PaperProps={{ style: { width: "300px" } }}
            >
                <ThemeProvider theme={theme}>
                    <form onSubmit={handleSubmit(onSubmitt)}>
                        <div className="ml-4 mt-4 flex ">
                            <img
                                src="/img/logo.png"
                                alt="Logo"
                                width="100"
                                height="100"
                            />
                        </div>
                        <DialogTitle
                            className="text-center text-green-500"
                            variant="h2"
                            style={{ fontSize: "1.5rem" }}
                        >
                            update
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText className="text-center">
                                We would appreciate your update.
                            </DialogContentText>

                            <Select
                                value={contractstatus}
                                onChange={(e) => setContractstatus(e.target.value)}
                                displayEmpty
                                inputProps={{ "aria-label": "Select Contract Status" }}
                            >
                                <MenuItem value="" disabled>
                                    Select a Contract
                                </MenuItem>

                                <MenuItem value="cancelled">Cancelled</MenuItem>
                                <MenuItem value="Renewed">Renewed</MenuItem>
                            </Select>
                            <br />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClosee}>Cancel</Button>
                            <Button type="submitt">Submit</Button>
                        </DialogActions>
                    </form>
                </ThemeProvider>
            </Dialog>
        </div >
    );
}
export default ContractDetail;