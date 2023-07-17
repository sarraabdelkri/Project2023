import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
axios.defaults.headers["X-API-KEY"] =
    "ARngdu7XD58VQ0gaI+fMbw==i9dql6cTENIqchjg";
import {
    Grid,
    Avatar,
    Paper,
    TextField,
    Button,
    AccordionSummary,
    Accordion,
    AccordionDetails,
    Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function ViewAssessment() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };
    const [assessment, setAssessment] = useState({});

    const [inputVal, setInputVal] = useState("");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const checkUser = () => {
        if (!user) {
            navigate("/");
        }
    }
    useEffect(() => {
        refreshAssessment(id);
        checkUser();
    }, [id]);

    const refreshAssessment = (id) => {
        axios
            .get(`https://expertise-shaper-37ut.onrender.com/api/assessment/getAssessment/${id}`)
            .then((res) => {
                if (res.data) {
                    setAssessment(res.data.assessment);
                    //console.log(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    const addComment = () => {
        if (!inputVal.length) return;

        axios
            .get(`https://api.api-ninjas.com/v1/profanityfilter?text=${inputVal}`, {
                headers: {
                    'X-Api-Key': "ThF9tKhcK6qyffPNz//5aw==p41haEl9ZBn28DcI",
                },
            })
            .then((response) => {
                const hasProfanity = response.data.has_profanity;

                if (!hasProfanity) {
                    // Call the server to add the comment
                    axios
                        .post('https://expertise-shaper-37ut.onrender.com/api/assessment/addComment', {
                            assessmentId: id,
                            message: inputVal,
                            sentFrom: localStorage.getItem('name'),
                        })
                        .then((response) => {
                            if (response.data) {
                                refreshAssessment(id);
                                setInputVal('');
                                toast.success('Comment added');
                            }
                        })
                        .catch((error) => {
                            toast.error('Error adding comment');
                        });
                } else {
                    toast.error('Comment contains profanity');
                }
            })
            .catch((error) => {
                toast.error('Error checking profanity filter');
            });
    };


    const deleteComment = (com) => {
        axios
            .delete("https://expertise-shaper-37ut.onrender.com/api/assessment/deleteComment", {
                data: {
                    assessmentId: id,
                    sentFrom: com.sentFrom,
                    message: com.message,
                },
            })
            .then((res) => {
                if (res.data) {
                    refreshAssessment(id);
                    toast.success("Comment deleted");
                }
            })
            .catch((err) => toast.error(err));
    };

    const handleDeleteComment = (com) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            deleteComment(com);
        }
    };

    return (
        <>
            <div className="h-full overflow-scroll px-6 pb-10 pt-4">
                <div className="mb-6 text-sm font-medium uppercase"></div>
                <div className="card">
                    <div
                        className="card-body"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                        }}
                    >
                        <h5 className="card-title">{assessment.name}</h5>
                        <Accordion expanded={expanded} onChange={handleChange}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="assessment-content"
                                id="assessment-header"
                            >
                                <Typography>
                                    {" "}
                                    {assessment.questions?.length} Questions
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="questions-wrapper">
                                    {assessment.questions
                                        ?.filter(
                                            (question) =>
                                                assessment.createdBy === localStorage.getItem("id")
                                        )
                                        .map((question, idx) => (
                                            <div className="question" key={idx}>
                                                <div>
                                                    name: &nbsp;
                                                    {question.questionName}
                                                </div>
                                                <div>
                                                    correct answer: &nbsp; {question.correctAnswer}
                                                </div>
                                            </div>
                                        ))}
                                    {assessment.createdBy !== localStorage.getItem("id") && (
                                        <div>Must be creator to look at questions</div>
                                    )}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <div
                            className="comments"
                            style={{
                                flexGrow: 1,
                                overflowY: "auto",
                                marginTop: 20,
                                marginBottom: 20,
                            }}
                        >
                            <br />
                            <div>
                                {" "}
                                {assessment.likes}
                                <FavoriteIcon style={{ color: "#0080FF" }} />
                            </div>

                            <br />
                            {assessment.comments?.map((com, idx) => (
                                <Paper
                                    style={{
                                        padding: "20px 20px",
                                        marginTop: 20,
                                        marginBottom: 20,
                                    }}
                                >
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk6qKlLk50SrpDFulviyCpf0E2AcU9ncWXpA&usqp=CAU"
                                            />
                                        </Grid>
                                        <Grid justifyContent="left" item xs zeroMinWidth>
                                            <h4 style={{ margin: 0, textAlign: "left" }}>
                                                {com.sentFrom}
                                            </h4>
                                            <p style={{ textAlign: "left" }}>{com.message}. </p>
                                        </Grid>
                                        {localStorage.getItem("name") === com.sentFrom ? (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDeleteComment(com)}
                                                style={{
                                                    height: "40px",
                                                    marginTop: "20px",
                                                    position: "center",
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        ) : null}
                                    </Grid>
                                </Paper>
                            ))}
                            <div className="input-field">
                                <TextField
                                    value={inputVal}
                                    onChange={(e) => setInputVal(e.target.value)}
                                    label="Add a new comment"
                                    variant="outlined"
                                    fullWidth
                                    style={{ marginTop: 20, marginBottom: 20 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addComment()}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ViewAssessment;
