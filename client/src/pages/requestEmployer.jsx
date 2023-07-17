import { useState } from "react";
import { toast } from "react-toastify";
import { PrimaryButton } from "../widgets/buttons/primary-button";
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

function requestEmployerProfile() {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios
                .put(
                    `https://expertise-shaper-37ut.onrender.com/api/user/request-employer-profile/${user._id}`,
                    data
                )
                .then((res) => {
                    if (res.status == 200) {
                        const user = res.data.user;
                        localStorage.setItem("user", JSON.stringify(user));
                        return res;
                    }
                });
            setOpen(false);
            toast.success("Your request is under review !");
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = async () => {
        try {
            const response = await axios.put(
              `https://expertise-shaper-37ut.onrender.com/api/user/cancel-request/${user._id}`
            );
        
            if (response.status === 200) {
              const updatedUser = response.data.user;
              localStorage.setItem("user", JSON.stringify(updatedUser));
              setOpen(false);
              toast.info("Request canceled!");
            }
          } catch (err) {
            console.error(err);
          }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#4CAF50",
            },
        },
    });

    return (
        <>
            <div className="border-primaryBorder mb-6 flex flex-col items-center justify-center rounded-lg border bg-orange-50 p-4 text-center">
                <div className="mb-4">
                    <img src="/img/logo-hire.png" alt="ES Hire" width="144" />
                </div>
                <h4 className="mb-1  text-sm font-semibold">Want to hire with us ?</h4>
                <p className="mb-2 break-words break-keep text-xs font-normal ">
                    Request for a Recruiter Profile &amp; access the features specific to
                    hiring
                </p>
                <PrimaryButton onClick={handleClickOpen}>
                    Request Recruiter Profile
                </PrimaryButton>
            </div>

            {!user.employerRequest ? (
                <Dialog open={open} onClose={handleClose}>
                    <ThemeProvider theme={theme}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mt-8 flex justify-center">
                                <img
                                    src="/img/logo-hire.png"
                                    alt="Logo"
                                    width="150"
                                    height="150"
                                    className="mx-auto"
                                />
                            </div>
                            <DialogTitle className="text-center">
                                Would you like to request for a Recruiter Profile ?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText className="text-center">
                                    Please make sure to complete this form
                                </DialogContentText>

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="companyName"
                                    label="Company name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...register("company", { required: true })}
                                />
                                {errors.company && (
                                    <p className="mt-1 text-xs font-medium italic text-red-300">
                                        This field is required
                                    </p>
                                )}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="companyWebsite"
                                    label="Company website"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...register("websitecompany", { required: true })}
                                />
                                {errors.websitecompany && (
                                    <p className="mt-1 text-xs font-medium italic text-red-300">
                                        This field is required
                                    </p>
                                )}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Your LinkedIn profile URL"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...register("linkedinUrl", { required: true })}
                                />
                                {errors.linkedinUrl && (
                                    <p className="mt-1 text-xs font-medium italic text-red-300">
                                        This field is required
                                    </p>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Submit</Button>
                            </DialogActions>
                        </form>
                    </ThemeProvider>
                </Dialog>
            ) : (
                <Dialog open={open} onClose={handleClose}>
                    <div className="mt-8 flex justify-center">
                        <img
                            src="/img/logo-hire.png"
                            alt="Logo"
                            width="150"
                            height="150"
                            className="mx-auto"
                        />
                    </div>
                    <DialogTitle className="text-center">
                        Your request is under review
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className="text-center">
                            We will get back to you as soon as possible
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={handleCancel} color="error">Cancel request</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default requestEmployerProfile;
