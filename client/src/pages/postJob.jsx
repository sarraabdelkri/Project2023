import { useState } from "react";
import { toast } from "react-toastify";
import { PrimaryButton } from "../widgets/buttons/primary-button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export function PostJob() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data) => {
        try {
            axios.interceptors.request.use(
                (config) => {
                    const token = localStorage.getItem('token');
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
            await axios.post(`https://expertise-shaper-37ut.onrender.com/api/job/addjob`, data)
            setOpen(false);
            toast.success("Your job listing has been successfully posted!");
        } catch (err) {
            console.error(err);
        }
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#4CAF50', // This is a shade of green
            },
        },
    });


    return <>
        <div className="border border-primaryBorder flex flex-col text-center justify-center items-center rounded-lg bg-orange-50 mb-6 p-4">
            <div className="mb-4">
                <img src="/img/logo-hire.png" alt="ES Hire" width="144" />
            </div>
            <p className="break-keep text-xs text font-normal break-words mb-2 ">Start hiring the most credible candidates with proof-of-skills!</p>
            <PrimaryButton onClick={handleClickOpen}>Post a Job</PrimaryButton>
        </div>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" >
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4 ml-4 flex ">
                        <img src="/img/logo-hire.png" alt="Logo" width="200" height="200" />
                    </div>
                    <DialogTitle className="text-center text-green-500" variant="h2">Post a Job</DialogTitle>
                    <DialogContent >
                        <DialogContentText className="text-center">
                            Please fill out the following fields to post a job listing.
                        </DialogContentText>
                        <Grid container spacing={4} >
                            <Grid item xs={6}  >
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...register('title', { required: true })}
                                />
                                {errors.title && <p className="mt-1 text-xs font-medium italic text-red-300">This field is required</p>}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="location"
                                    label="Location"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...register('location', { required: true })}
                                />
                                {errors.location && (
                                    <p className="mt-1 text-xs font-medium italic text-red-300">
                                        This field is required
                                    </p>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="standard" >
                                    <InputLabel id="workplaceType-label">Workplace Type</InputLabel>
                                    <Select
                                        defaultValue=""
                                        labelId="workplaceType-label"
                                        id="workplaceType"
                                        {...register('workplaceType', { required: true })}
                                    >
                                        <MenuItem value="on-site">On-site</MenuItem>
                                        <MenuItem value="hybrid">Hybrid</MenuItem>
                                        <MenuItem value="remote">Remote</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.workplaceType && <p className="mt-1 text-xs font-medium italic text-red-300">This field is required</p>}
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="standard" >
                                    <InputLabel id="jobType-label">Job Type</InputLabel>
                                    <Select
                                        defaultValue=""
                                        labelId="jobType-label"
                                        id="jobType"
                                        {...register('jobType', { required: true })}
                                    >
                                        <MenuItem value="full-time">Full-time</MenuItem>
                                        <MenuItem value="part-time">Part-time</MenuItem>
                                        <MenuItem value="internship">Internship</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.jobType && <p className="mt-1 text-xs font-medium italic text-red-300">This field is required</p>}
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="requiredSkills"
                                    label="Required Skills"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...register('requiredSkills', { required: true })}
                                />
                                {errors.requiredSkills && (
                                    <p className="mt-1 text-xs font-medium italic text-red-300">
                                        This field is required
                                    </p>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="aboutJob"
                                    label="About this opportunity"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    multiline
                                    {...register('aboutJob', { required: true })}
                                />
                                {errors.aboutJob && <p className="mt-1 text-xs font-medium italic text-red-300">This field is required</p>}
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

    </>

}

export default PostJob;