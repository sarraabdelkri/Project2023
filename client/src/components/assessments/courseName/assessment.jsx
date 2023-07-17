import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import useAssessmentStore from "@/store/assessmentStore";

export function Assessment({ assessment }) {
    const [userName, setUserName] = useState("");

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
    }, [userName]);
   
    const fetchAssessments = useAssessmentStore(
        (state) => state.fetchAssessments
    );
    const navigate = useNavigate();

    const likeAssessment = (assessmentId) => {
        axios
            .post("https://expertise-shaper-37ut.onrender.com/api/assessment/likeAssessment", {
                assessmentId: assessmentId,
                userId: localStorage.getItem("id"),
            })
            .then((res) => {
                if (res.data) {
                    toast.success(res.data.message, { autoClose: 3000 });
                    fetchAssessments();
                    window.location.reload()
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("An error occurred while liking the quiz.", {
                    autoClose: 3000,
                });
            });
    };

    const startAssessment = (assessmentId) => {
        const userId = localStorage.getItem("id");

        axios
            .get(`https://expertise-shaper-37ut.onrender.com/api/result/getResultsByUserId/${userId}`)
            .then((response) => {
                const results = response.data;
                const matchingResult = results.find(
                    (result) => result.assessmentId === assessmentId
                );

                if (matchingResult) {
                    const resultId = matchingResult._id;
                    toast.error("You have already passed the quiz.", {
                        autoClose: 3000,
                    });
                    navigate(`/view-results?id=${resultId}`);
                } else {
                    navigate(`/take-assessment?id=${assessmentId}`, {
                        state: { assessment: assessment },
                    });
                }
            })
            .catch((error) => console.error(error));
    };
    const viewAssessment = (assessmentId) => {
        navigate(`/view-assessment?id=${assessmentId}`);
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
                <p className="text-gray-500">Created by: Instructor {userName}</p>
                <p className="text-gray-500">Date created: {formattedDate}</p>
                <div className="mt-4">
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => startAssessment(assessment._id)}
                            style={{
                                borderColor: "green",
                                backgroundColor: "white",
                                color: "#1E9645",
                            }}
                        >
                            Pass
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => viewAssessment(assessment._id)}
                            style={{
                                borderColor: "green",
                                backgroundColor: "white",
                                color: "#1E9645",
                            }}
                        >
                            FeedBack
                        </Button>
                        <Button
                            style={{
                                color: "#1E9645",
                            }}
                        >
                            <FavoriteIcon onClick={() => likeAssessment(assessment._id)} />
                            {assessment.likes}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Assessment;
