import { useForm } from "react-hook-form";
import { SecondaryButton } from "@/widgets/buttons";
import { useState } from "react";
import { toast } from "react-toastify";
import useContractStore from "@/store/contractStore";
import PrimaryButton from "../../widgets/buttons/primary-button";
import { useLocation } from "react-router-dom";
import { Spinner } from "@/widgets";
import {
    UserCircleIcon,
    NoSymbolIcon,
    CheckCircleIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
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

export function EditContract() {
    const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

    const fetchContracts = useContractStore((state) => state.fetchContracts);
    const updateContract = useContractStore((state) => state.updateContract);
    const [loading, setLoading] = useState(false);
    const [contractstatus, setContractstatus] = useState("");
    const { id } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        fetchContracts();
    }, []);

    let urll = `https://expertise-shaper-37ut.onrender.com/api/contract/fetch-pdf/${userId}/${jobId}/${atelierId}`;
    const handleSubmit = async () => {
        try {
            const response = await updateContract(id, contractstatus);
            const pdfResponse = await axios.get(urll, {
                responseType: "blob",
            });
            const pdfBlob = new Blob([pdfResponse.data], { type: "application/pdf" });
            saveAs(pdfBlob, "newPdf.pdf");
            navigate("/contract");
        } catch (error) {
            // Handle error
        }
    };


    return (
        <Container injectFirst>
            <Typography variant="h4">Edit Contract</Typography>
            <FormControl>
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

                <PrimaryButton variant="contained" onClick={handleSubmit}>
                    Update Contract
                </PrimaryButton>
            </FormControl>
        </Container>
    );
}

export default EditContract;