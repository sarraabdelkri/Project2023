import { AppLayout } from "@/widgets/layout";
import { useEffect, useState } from "react";
import courseStore from "@/store/courseStore";
import notificationStore from "@/store/notificationStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../../widgets/buttons/primary-button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import { Container, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { format } from "date-fns";
import { ArrowSmallRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { BeatLoader } from "react-spinners";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

export function CheckCourse() {
    const getCourseById = courseStore((state) => state.getCourseById);
    const isInList = courseStore((state) => state.isInList);
    const similarCourses = courseStore((state) => state.similarCourses);
    const addToWishlist = courseStore((state) => state.addToWishlist);
    const removeFromWishlist = courseStore((state) => state.removeFromWishlist);
    const { sendNotification } = notificationStore();
    const course = courseStore((state) => state.course);
    const addCourseToUser = courseStore((state) => state.addCourseToUser);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const [open, setOpen] = useState(false);
    const [relatedCourses, setRelatedcourses] = useState([]);
    const getEnrolledCourses = courseStore((state) => state.getEnrolledCourses);
    const getCourseProgress = courseStore((state) => state.getCourseProgress);
    const [isenrolled, SetIsenrolled] = useState(false);
    const { id } = useParams();
    const [isInWishlist, setIsInWishlist] = useState();
    const navigate = useNavigate();
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [opens, setOpens] = useState(false);
    const [rating, setRating] = useState("");
    const [progress, setProgress] = useState();
    const courseId = id;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const goToTakeCoursePage = () => {
        navigate(`/courses/courseContent/${course._id}`);
    };
    const courseProgress = async () => {
        const res = await getCourseProgress(userId, courseId)
        setProgress(res.data)
    }
    const setwishlist = async () => {
        const res = await isInList(userId, id);
        setIsInWishlist(res.data.isInWishlist);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#4CAF50",
            },
        },
    });
    const addToWishList = async () => {
        try {
            await addToWishlist(userId, id);
            toast.success("added to wishlist", { autoClose: 3000 });
            setIsInWishlist(true);
            await sendNotification(
                userId,
                `You have added ${course.name} course to your wishlist!`
            );
        } catch (error) {
            console.error(error);
            toast.error("can't be added to wish list", { autoClose: 3000 });
        }
    };
    const removeWishList = async () => {
        try {
            await removeFromWishlist(userId, id);
            toast.success("removed from wishlist", { autoClose: 3000 });
            setIsInWishlist(false);
        } catch (error) {
            console.error(error);
            toast.error("can't be removed to wish list", { autoClose: 3000 });
        }
    };

    const isenrolledornot = async () => {
        const response = await getEnrolledCourses(userId);
        if (response) {
            const enrolledCourseIds = response.map((course) => course.course);
            if (enrolledCourseIds.includes(id)) {
                SetIsenrolled(true);
            }
        }
    };

    useEffect(() => {
        const getSimilarCourses = async () => {
            try {
                const response = await similarCourses(id);
                setRelatedcourses(response);
            } catch (err) {
                console.error(err);
            }
        };
        getSimilarCourses();
        isenrolledornot();
        courseProgress()
        setwishlist();
    }, [id]);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleEnroll = async () => {
        addCourseToUser(userId, course._id);
        await sendNotification(
            userId,
            `${course.name} course is paid successfuly!`
        );
    };
    useEffect(() => {
        (async () => {
            const courseData = await getCourseById(id);
        })();
        const url = `https://expertise-shaper-37ut.onrender.com/api/review/${id}/reviews`;
        console.log("Fetching contract data from:", url);

        const fetchReview = async () => {
            try {
                const response = await axios.get(url);
                setRatings(response.data.ratings);
                setAverageRating(response.data.averageRating);
            } catch (error) {
                console.log(error);
            }
        };

        if (id) {
            fetchReview();
        }
    }, [getCourseById, id]);
    if (!course) {
        return (
            <div className="flex h-screen items-center justify-center">
                <BeatLoader color="#1E9645" size={20} />
            </div>
        );
    }

    const handleClosee = () => {
        setOpens(false);
    };
    const handleClickOpenss = (courseId, userId) => {
        setOpens(`/review/${courseId}/reviews/${userId}`);
    };
    const onSubmitt = async (data) => {
        const reviewData = {
            rating: rating,
        };
        let url = `https://expertise-shaper-37ut.onrender.com/api/review/${courseId}/reviews/${userId}`;
        console.log("url", url);
        try {
            const response = await axios.post(url, reviewData);
            console.log("response", response);
            toast.success("Review added successfully");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding your review");
        }
        setRating("");
    };
    return (
        <>
            <AppLayout>
                <AppLayout.Header>{course.name} course </AppLayout.Header>
                <div className="h-full overflow-scroll px-6 pb-10 pt-4">
                    <ToastContainer />
                    <Container>
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
                                        <Row className="pb-3">
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
                                                            src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${course.name}.svg`}
                                                        />
                                                    </div>
                                                    <Card.Title>
                                                        {isenrolled && progress != 100 ? (
                                                            <Link to={`/courses/courseContent/${course._id}`}>
                                                                {course.name}
                                                            </Link>
                                                        ) : (
                                                            <>
                                                                {" "}
                                                                <Link>{course.name}</Link>
                                                            </>
                                                        )}
                                                    </Card.Title>
                                                </div>
                                            </Col>
                                            <Col className="d-flex justify-content-end">
                                                <PrimaryButton
                                                    onClick={handleClickOpen}
                                                    variant="primary"
                                                    size="sm"
                                                    disabled={isenrolled}
                                                >
                                                    {isenrolled ? "Enrolled" : "Enroll"}
                                                </PrimaryButton>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                            Price: {course.price} Dt
                                        </Card.Text>
                                        <hr />
                                        <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                            Duration: {course.duration} Months
                                        </Card.Text>
                                        <hr />{" "}
                                        <small>
                                            <Card.Text className=" mr-1 text-xs font-normal capitalize sm:mb-0">
                                                {" "}
                                                [ {format(
                                                    new Date(course.startdate),
                                                    "yyyy-MM-dd"
                                                )} - {format(new Date(course.enddate), "yyyy-MM-dd")} ]{" "}
                                            </Card.Text>{" "}
                                        </small>
                                        <hr />{" "}
                                        <Row>
                                            {" "}
                                            <Card.Text className="text-muted pt-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <small className="text-muted">
                                                        Posted on:{" "}
                                                        {format(new Date(course.createdAt), "yyyy-MM-dd")}
                                                        <br />
                                                        {course.duration} Sessions
                                                    </small>
                                                    <small>
                                                        {isInWishlist ? (
                                                            <Button
                                                                style={{
                                                                    color: "#1E9645",
                                                                }}
                                                                onClick={removeWishList}
                                                            >
                                                                <FavoriteIcon style={{ width: 20 }} />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                style={{
                                                                    color: "grey",
                                                                }}
                                                                onClick={addToWishList}
                                                            >
                                                                <FavoriteIcon style={{ width: 20 }} />
                                                            </Button>
                                                        )}
                                                    </small>
                                                </div>
                                                {isenrolled ? (<> <Box>
                                                    {averageRating ? (
                                                        <>
                                                            <Typography variant="h6">
                                                                {averageRating.toFixed(1)}
                                                            </Typography>
                                                            <Rating
                                                                name="average-rating"
                                                                value={averageRating}
                                                                readOnly
                                                            />
                                                        </>
                                                    ) : (
                                                        <Rating name="no-rating" value={0} readOnly />
                                                    )}
                                                </Box>
                                                    <PrimaryButton
                                                        width="100"
                                                        onClick={() => handleClickOpenss(course._id, userId)}
                                                    >
                                                        Review
                                                    </PrimaryButton></>) : null}

                                                <Dialog
                                                    open={opens}
                                                    onClose={handleClose}
                                                    fullWidth
                                                    maxWidth="xs"
                                                    PaperProps={{ style: { width: "300px" } }}
                                                >
                                                    <ThemeProvider theme={theme}>
                                                        <form onSubmit={handleSubmit(onSubmitt)}>
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
                                                                style={{ fontSize: "1.5rem" }}
                                                            >
                                                                Add Your FeedBack
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText className="text-center">
                                                                    We would appreciate your feedback.
                                                                </DialogContentText>

                                                                <Box
                                                                    component="fieldset"
                                                                    mb={3}
                                                                    borderColor="transparent"
                                                                    style={{ textAlign: "center" }}
                                                                >
                                                                    <Rating
                                                                        name="rating"
                                                                        value={rating}
                                                                        precision={1}
                                                                        onChange={(event, newValue) => {
                                                                            setRating(newValue);
                                                                        }}
                                                                    />
                                                                </Box>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClosee}>Cancel</Button>
                                                                <Button type="submitt">Submit</Button>
                                                            </DialogActions>
                                                        </form>
                                                    </ThemeProvider>
                                                </Dialog>
                                            </Card.Text>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <Row>
                                    <div className="mb-10 mt-10">
                                        <p className="text mb-4 text-base font-semibold">
                                            {" "}
                                            About this course
                                        </p>
                                        <div className="text-sm font-normal">
                                            <p>{course.description}</p>
                                        </div>
                                    </div>
                                </Row>
                            </Col>

                            <Col className="ml-12 ">
                                <Card>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: "15px" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <p
                                                    style={{
                                                        fontSize: "15px",
                                                        margin: 0,
                                                    }}
                                                >
                                                    Similar Courses
                                                </p>
                                                <ArrowSmallRightIcon className="ml-2 h-4 w-4" />
                                            </div>
                                        </Card.Title>
                                        <div style={{ textAlign: "center", color: "#1E9645" }}>
                                            <ul>
                                                {relatedCourses.map((course) => (
                                                    <li key={course._id}>
                                                        <Link to={`/courses/${course._id}`}>
                                                            {course.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <Row>
                                    {isenrolled ? (
                                        <div className="flex items-center">

                                            <button
                                                onClick={goToTakeCoursePage}
                                                className="absolute bottom-0 mb-5 ml-11 mr-6 flex items-center rounded-md px-6 py-2 text-white"
                                                style={{ backgroundColor: "#1E9645" }}
                                            >
                                                Take the course{" "}
                                                <ArrowSmallRightIcon className="ml-2 h-4 w-4" />
                                            </button>

                                        </div>
                                    ) : null}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <ThemeProvider theme={theme}>
                        <form>
                            <div className="mt-8 flex justify-center">
                                <img
                                    src="/img/logo.png"
                                    alt="Logo"
                                    width="150"
                                    height="150"
                                    className="mx-auto"
                                />
                            </div>
                            <DialogTitle className="text-center">Payment</DialogTitle>
                            <DialogContent>
                                <DialogContentText className="text-center">
                                    We need your credit card informations{" "}
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="cardnumber"
                                    label="Card Holder*"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="cardnumber"
                                    label="Credit Card number*"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <div className="flex">
                                    <div className="mb-0.5 flex items-center justify-between">
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="cardnumber"
                                            label=" "
                                            type="date"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </div>
                                    <div
                                        className="end-0 top-0 flex"
                                        style={{ marginLeft: "40px" }}
                                    >
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="cardnumber"
                                            label="CVC*"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleEnroll} type="submit">
                                    Submit
                                </Button>
                            </DialogActions>
                        </form>
                    </ThemeProvider>
                </Dialog>
            </AppLayout>
        </>
    );
}

export default CheckCourse;