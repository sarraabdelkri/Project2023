import useAssessmentStore from "@/store/assessmentStore";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export function Assessment({ assessment }) {
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const date = new Date(assessment.createdAt);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1
        }/${date.getFullYear()}`;

    const userId = assessment.createdBy;
    useEffect(() => {
        axios
            .get(`https://expertise-shaper-37ut.onrender.com/api/user/getUserNameById/${userId}`)
            .then((response) => {
                const userName = response.data.userName;
                setUserName(userName);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);
    const fetchMyAssessment = useAssessmentStore(
        (state) => state.fetchMyAssessment
    );

    const viewAssessment = (assessmentId) => {
        navigate(`/view-assessment?id=${assessmentId}`);
    };

    const handleDelete = () => {
        setLoading(true);
        axios
            .delete(
                `https://expertise-shaper-37ut.onrender.com/api/assessment/deleteAssessment/${assessment._id}`
            )
            .then((response) => {
                setLoading(false);
                fetchMyAssessment();
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
            {assessment.imgUrl && (
                <img
                    className="h-40 w-full object-cover"
                    src={assessment.imgUrl}
                    alt="Assessment Image"
                />
            )}
            <div className="p-4">
                <h2 className="text-lg font-medium text-gray-900">{assessment.name}</h2>
                <p className="mt-2 text-gray-500">Category: {assessment.category}</p>
                <p className="text-gray-500">Created by: {userName}</p>
                <p className="text-gray-500">Course name: {assessment.courseName}</p>

                <p className="text-gray-500">Date created: {formattedDate}</p>
                <p className="text-gray-500">Likes: {assessment.likes}</p>
                <div className="mt-4">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => viewAssessment(assessment._id)}
                    >
                        FeedBack
                    </Button>
                    &nbsp;
                    <Button variant="outlined" color="error" onClick={handleClickOpen}>
                        Delete
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Delete confirmation"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this quiz?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={handleClose}>
                                Disagree
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default Assessment;
