/* import Accordion from "react-bootstrap/Accordion";*/
import useAssessmentStore from "@/store/assessmentStore";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";

export function Assessment({ assessment }) {
  const [userName, setUserName] = useState(""); // initialize with a default value

  const date = new Date(assessment.createdAt);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const userId = assessment.createdBy;
  useEffect(() => {
    axios
      .get(`http://localhost:9000/user/getUserNameById/${userId}`)
      .then((response) => {
        const userName = response.data.userName;
        setUserName(userName); // update the state with the fetched user name
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);
  const fetchAssessments = useAssessmentStore(
    (state) => state.fetchAssessments
  );

  const navigate = useNavigate();

  const likeAssessment = (assessmentId) => {
    axios
      .post("http://localhost:9000/assessment/likeAssessment", {
        assessmentId: assessmentId,
        userId: localStorage.getItem("id"),
      })
      .then((res) => {
        if (res.data) {
          toast.success(res.data.message, { autoClose: 3000 });
          fetchAssessments();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while liking the quiz.", {
          autoClose: 3000,
        });
      });
  };

  const viewAssessment = (assessmentId) => {
    navigate(`/view-assessment?id=${assessmentId}`);
  };

  const startAssessment = (assessmentId) => {
    navigate(`/take-assessment?id=${assessmentId}`, {
      state: { assessment: assessment },
    });
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
        <p className="text-gray-500">Date created: {formattedDate}</p>
        <div className="mt-4">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => startAssessment(assessment._id)}
          >
            Pass
          </Button>
          &nbsp;
          <Button
            variant="outlined"
            color="primary"
            onClick={() => viewAssessment(assessment._id)}
          >
            FeedBack
          </Button>{" "}
          <Button>
            <FavoriteIcon onClick={() => likeAssessment(assessment._id)} />{" "}
            {assessment.likes}
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Assessment;
