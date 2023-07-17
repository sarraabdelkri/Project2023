import { AppLayout } from "@/widgets/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import {
    UserCircleIcon,
    CheckCircleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Card } from "react-bootstrap";
import profilepic from "../../../client/public/css/profile.css";
import { useRef } from "react";
import courseStore from "@/store/courseStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useUserStore from "@/store/userStore";
import authService from "@/services/userService";
import Dialog from "@mui/material/Dialog";
import { toast } from 'react-toastify';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
const staticSkills = ["React", "JavaScript", "HTML", "CSS", "Node.js"];
import { useForm } from "react-hook-form";
import {
    Grid,
    Typography,
    FormControl,
    InputLabel,

} from "@mui/material";
const staticexperience = [
    {
        title: "Frontend Developer",
        company: "Focus",
        location: "New York, NY",
        startDate: "2018-01-01",
        endDate: "2021-05-01",
        description: "React developer",
    },
];
export function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [skills, setSkills] = useState([]);
    const [createdAt, setCreatedAt] = useState("");
    const [assessments, setAssessments] = useState([]);
    const [results, setResults] = useState([]);
    const [duration, setDuration] = useState();
    const [totalduration, setTotalduration] = useState();
    const [experience, setExperience] = useState([]);
    const [user1, setUser1] = useState({});
    const id = localStorage.getItem("id");
    const userId = localStorage.getItem("id");
    const getLastSessionDuration = courseStore((state) => state.getLastSessionDuration);
    const getSessionDurations = courseStore((state) => state.getSessionDurations);
    const [profilePicture, setProfilePicture] = useState("");
    const fileInput = useRef(null);
    const [rand, setRand] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const updateUserpassword = useUserStore((state) => {
        return state.updateUserpassword;
    });
    const updateUser = useUserStore((state) => {

        return state.updateUser;
    });
    const getUserById = useUserStore((state) => {

        return state.getUserById;
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const theme = createTheme({
        palette: {
            primary: {
                main: "#4CAF50",
            },
        },
    });

    const handleClick = () => {
        fileInput.current.click();
        setRand(Math.random());
    };
    const prepareDate = () => {
        const date = new Date(user?.createdAt);
        // format to DD month YYYY
        const createdAt = `${date.getDate()} ${date.toLocaleString("en-US", {
            month: "short",
        })} ${date.getFullYear()}`;
        setCreatedAt(createdAt);
    };

    const checkUser = () => {
        if (!user) {
            navigate("/sign-in");
        }
    };

    const getScore = (result) => {
        let len = result.answers.length;
        let right = result.answers.filter((ans) => ans === true);
        return 100 * (right.length / len) + "%";
    };
    const displaysessionduration = async () => {
        const res = await getLastSessionDuration(userId)
        setDuration(res)
    }
    const displaysessiondurations = async () => {
        const res = await getSessionDurations(userId)
        setTotalduration(res)
    }
    useEffect(() => {
        console.log('duration:', duration);
    }, [duration]);
    useEffect(() => {
        checkUser();
        prepareDate();
        fetchUserData();
        displaysessionduration()
        displaysessiondurations()
        const id = localStorage.getItem("id");
        if (!id) {
            navigate("/");
        } else {
            axios
                .get(
                    "https://expertise-shaper-37ut.onrender.com/api/result/getResultsAndAssessmentsByUserId/" + id
                )
                .then((res) => {
                    setResults(res.data.data.map((result) => result.result));
                    setAssessments(res.data.data.map((result) => result.assessment));
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        setSkills(staticSkills);
        setExperience(staticexperience);
    }, []);
    function handleSelectFile(e) {
        console.log(e.target.files);
        setProfilePicture(e.target.files[0]);

    }

    const uploadPicture = async (event) => {
        try {
            event.preventDefault();
            const profilePictureInput = document.getElementById(
                "profilePictureInput"
            );
            const profilePicture = profilePictureInput.files[0];
            console.log(profilePictureInput.files[0]); // a
            const formData = new FormData();
            formData.append("profilePicture", profilePicture);

            const response = await axios.post(
                `https://expertise-shaper-37ut.onrender.com/api/user/profile-picture/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setProfilePicture(response.data.profilePicture);

            console.log(profilePicture);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchUserData = async () => {
        try {
            const urll = `https://expertise-shaper-37ut.onrender.com/api/user/fetch/${id}`;

            const response = await axios.get(urll);
            setUser1(response.data.user);
            console.log("hhhhh", urll);
            setUser1(response);
        } catch (error) {
            console.error(error);
        }
    };
    const [opens, setOpens] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClosee = async () => {
        const response = await getUserById(id);
        console.log("response from getUserById:", response);
        setUser1(response.data.user1);
        console.log("user1 set to:", response.data.user1);
        setOpens(false);
        console.log("Opens set to false");
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenss = async (id, password) => {
        try {
            const response = await getUserById(id);
            setUser1(response.data.user1);
            setPassword(password);
            setOpens(`/edit-profil/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmitt = async (e) => {
        e.preventDefault();

        if (password === "") {
            setErrorMessage("Please enter a password.");
            toast.error("Please enter a password.");
            return;
        }

        if (confirmPassword === "") {
            setErrorMessage("Please confirm your password.");
            toast.error("Please confirm your password.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        }


        try {
            await updateUserpassword(user._id, password);
            toast.success("Password updated");
            handleClose();
        } catch (error) {
            toast.error(error.response.data.message);
            toast.success("ERROR updated");
        }
    };



    return (
        <AppLayout>
            <AppLayout.Header>Profile</AppLayout.Header>
            <AppLayout.Content>
                <div className="flex h-full flex-col items-center px-4 pt-10">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="col-span-1 mr-5 flex flex-col items-center">
                            <div className="mr-6 flex flex-col ">
                                <div class="profilepic">
                                    <img
                                        src={`https://expertise-shaper-37ut.onrender.com/api/user/fetch/${userId}`}
                                        width="150"
                                        height="150"
                                        alt="Profibild"
                                    />
                                    <div onClick={handleClick} className="profilepic__content">
                                        <span className="profilepic__icon">
                                            <i className="fas fa-camera"></i>
                                        </span>
                                        <span className="profilepic__text">Edit Profile</span>
                                        <input
                                            type="file"
                                            id="profilePictureInput"
                                            accept="image/*"
                                            onChange={uploadPicture}
                                            ref={fileInput}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                </div>
                                <h1
                                    className="mr-3 text-2xl font-bold text-gray-800"
                                    style={{
                                        fontSize: "1.7rem",
                                        fontWeight: "normal",
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    {user.name}
                                </h1>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <Link onClick={() => handleClickOpenss(id, user.password)}>

                                {" "}
                                <Cog6ToothIcon className="text-grey-500 float-right h-6 w-6" />
                            </Link>
                            <div className="flex items-center">
                                <CheckCircleIcon className="mr-2 h-6 w-6 text-green-500" />
                                <h1 className="text-xl font-bold tracking-widest text-gray-800">
                                    Verified
                                </h1>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-500 pt-1">Account created on {createdAt}</p> <br />
                                <p style={{ color: "#0E5605" }} className="text-sm font-medium">Last session duration: {Math.round(duration / 60)} minutes</p>
                                <p style={{ color: "#0E5605" }} className="text-sm font-medium pt-2">Total platform activity: {Math.round(totalduration / 60)} minutes</p>
                            </div>

                            <div className="mt-4">
                                <div className="mt-4">
                                    <h1
                                        className="text-xl font-bold tracking-widest text-gray-800"
                                        style={{
                                            fontSize: "1.1rem",
                                            fontWeight: "normal",
                                            fontFamily: "sans-serif",
                                        }}
                                    >
                                        Skills
                                    </h1>
                                    <div className="mt-3 flex flex-wrap ">
                                        {results.map((result, index) => {
                                            const assessment = assessments.find(
                                                (a) => a._id === result.assessmentId
                                            );

                                            if (assessment && parseFloat(getScore(result)) > 50) {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="ml-2 flex items-center rounded-lg bg-green-500 px-2 py-1 text-xs font-bold text-white"
                                                    >
                                                        {assessment.name}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full flex-col items-center px-4 pt-10">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <h1
                                    className=" text-xl font-bold text-gray-800"
                                    style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "normal",
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    Contact information
                                </h1>
                                <div className="mt-4">
                                    <h1
                                        className="text-lg text-gray-600"
                                        style={{
                                            fontSize: "0.8rem",
                                            fontWeight: "normal",
                                            fontFamily: "sans-serif",
                                        }}
                                    >
                                        {user.email}
                                    </h1>
                                    <h1
                                        className="text-lg text-gray-600"
                                        style={{
                                            fontSize: "0.8rem",
                                            fontWeight: "normal",
                                            fontFamily: "sans-serif",
                                        }}
                                    >
                                        26399046
                                    </h1>
                                    <h1
                                        className="text-lg font-bold tracking-widest text-gray-600"
                                        style={{
                                            fontSize: "0.8rem",
                                            fontWeight: "normal",
                                            fontFamily: "sans-serif",
                                        }}
                                    >
                                        Tunisia , Tunis
                                    </h1>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <h1
                                    className="text-xl font-bold tracking-widest text-gray-800"
                                    style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "normal",
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    Work experience
                                </h1>
                                <div className="mt-4">
                                    {experience.map((exp, index) => (
                                        <div key={index} className="mb-4">
                                            <h1
                                                className="text-lg font-bold tracking-widest text-gray-800"
                                                style={{
                                                    fontSize: "0.8rem",
                                                    fontWeight: "normal",
                                                    fontFamily: "sans-serif",
                                                }}
                                            >
                                                {exp.title}
                                            </h1>
                                            <h1 className="text-md text-gray-600">
                                                {exp.company}, {exp.city}
                                            </h1>
                                            <p className="mt-2">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>

                                <Link to={`/pdfContract`}>
                                    <Button variant="outlined" color="success">Download Your Contract</Button>
                                </Link>


                                <br />
                                <Dialog
                                    open={opens}
                                    onClose={handleClose}
                                    fullWidth
                                    maxWidth="md"
                                    PaperProps={{ style: { width: "300px" } }}
                                >
                                    <ThemeProvider theme={theme}>
                                        <form onSubmit={onSubmitt
                                        }>
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
                                                update Password
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText className="text-center">
                                                    We would appreciate your update.
                                                </DialogContentText>

                                                <Grid container spacing={4}>

                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            autoFocus
                                                            margin="dense"
                                                            id="password"
                                                            label="password"
                                                            type="password"
                                                            fullWidth
                                                            variant="standard"
                                                            value={password}
                                                            onChange={(event) => setPassword(event.target.value)}
                                                        />
                                                        {errors.password && (
                                                            <p className="mt-1 text-xs font-medium italic text-red-300">
                                                                This field is required
                                                            </p>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            autoFocus
                                                            margin="dense"
                                                            id="confirmPassword"
                                                            label="confirmPassword"
                                                            type="password"
                                                            fullWidth
                                                            variant="standard"
                                                            value={confirmPassword}
                                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                                        />
                                                        {errors.confirmPassword && (
                                                            <p className="mt-1 text-xs font-medium italic text-red-300">
                                                                This field is required
                                                            </p>
                                                        )}
                                                    </Grid>
                                                </Grid>                                    </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClosee}>Cancel</Button>
                                                <Button type="submitt">Submit</Button>
                                            </DialogActions>
                                        </form>
                                    </ThemeProvider>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout.Content>
        </AppLayout>
    );
}
export default Profile;