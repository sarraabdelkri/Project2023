import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContractsList } from "@/components/contracts";
import { PrimaryButton } from "../widgets/buttons/primary-button";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

export function Contract() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#4CAF50", // This is a shade of green
            },
        },
    });

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const checkUser = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/sign-in");
        }
        if (user && user?.role != "employer") {
            navigate("/jobs");
        }
    };
    const handleClickOpen = () => {
        navigate("/contracts");
    };

    useEffect(() => {
        checkUser();
    }, []);
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpens = () => {
        setOpen(true);
    };
    const onSubmit = async (data) => {
        await axios.post(`https://expertise-shaper-37ut.onrender.com/api/atelier/addarticle`, data);
        setOpen(false);
        toast.success("Your Article  listing has been successfully posted!");
    };

    return (
        <AppLayout>
            <AppLayout.Header>Contract</AppLayout.Header>
            <Container>
                <Row>
                    <Col md={8}>
                        <ContractsList />
                    </Col>

                    <Col md={4}>
                        <div className="border-primaryBorder mb-6 flex flex-col items-center justify-center rounded-lg border bg-orange-50 p-4 text-center">
                            <div className="mb-4">
                                <img src="/img/logo-hire.png" alt="ES Hire" width="144" />
                            </div>
                            <p className="break-keep text-xs text font-normal break-words mb-2 "> It would be great if you could include your article</p>

                            <PrimaryButton width="100" onClick={handleClickOpens}>
                                Article
                            </PrimaryButton>
                        </div>
                    </Col>

                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                        <ThemeProvider theme={theme}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="ml-4 mt-4 flex ">
                                    <img
                                        src="/img/logo-hire.png"
                                        alt="Logo"
                                        width="100"
                                        height="100"
                                    />
                                </div>
                                <DialogTitle
                                    className="text-center text-green-500"
                                    variant="h2"
                                >
                                    Atelier
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText className="text-center">
                                        Please fill out the following fields to atelier listing.
                                    </DialogContentText>
                                    <Grid container spacing={4}>
                                        <Grid item xs={6}>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="title"
                                                label="Title"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                {...register("title", { required: true })}
                                            />
                                            {errors.title && (
                                                <p className="mt-1 text-xs font-medium italic text-red-300">
                                                    This field is required
                                                </p>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="description"
                                                label="description"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                {...register("description", { required: true })}
                                            />
                                            {errors.description && (
                                                <p className="mt-1 text-xs font-medium italic text-red-300">
                                                    This field is required
                                                </p>
                                            )}
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">Submit</Button>
                                </DialogActions>
                            </form>
                        </ThemeProvider>
                    </Dialog>
                </Row>
            </Container>
        </AppLayout>
    );
}

export default Contract;
