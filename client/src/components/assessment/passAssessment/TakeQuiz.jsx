import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import styles from "./TakeQuiz.module.css";

import {
  Button,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export function TakeQuiz() {
  const [open, setOpen] = React.useState(false);

  const [assessment, setAssessment] = useState({});
  const [answers, setAnswers] = useState([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    refreshAssessment(id);
  }, [id]);

  const refreshAssessment = (id) => {
    axios
      .get(`http://localhost:9000/assessment/getAssessment/${id}`)
      .then((res) => {
        if (res.data) {
          setAssessment(res.data.assessment);
          setAnswers(Array(res.data.assessment.questions.length).fill(0));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const prevQuestion = () => {
    let newIdx = activeQuestionIdx;
    newIdx--;
    if (newIdx < 0) return;
    setActiveQuestionIdx(newIdx);
  };

  const nextQuestion = () => {
    let newIdx = activeQuestionIdx;
    newIdx++;
    if (newIdx === assessment.questions.length) return;
    setActiveQuestionIdx(newIdx);
  };

  const getPercentage = (ans) => {
    let total = 0;
    ans.forEach((answer) => {
      if (answer !== 0) {
        total += 1 / answers.length;
      }
    });
    setPercentage(total);
  };

  const selectAnswer = (idx) => {
    let questions = assessment;
    questions.questions[activeQuestionIdx].answers.forEach((ans) => {
      ans.selected = false;
    });
    questions.questions[activeQuestionIdx].answers[idx].selected = true;
    let newAnswers = [...answers];
    if (
      assessment.questions[activeQuestionIdx].answers[idx].name ===
      assessment.questions[activeQuestionIdx].correctAnswer
    ) {
      newAnswers[activeQuestionIdx] = true;
    } else {
      newAnswers[activeQuestionIdx] = false;
    }
    setAssessment(questions);
    setAnswers(newAnswers);
    getPercentage(newAnswers);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const finishQuiz = () => {
    axios
      .post("http://localhost:9000/result/saveResult", {
        currentUser: localStorage.getItem("id"),
        answers: answers,
        assessmentId: assessment._id,
      })
      .then((res) => {
        if (res.data) {
          navigate("/view-results?id=" + res.data.resultId);
        }
      });
  };
  return (
    <>
      <div className={styles.scrollContainer}>
        {assessment.questions && (
          <div className={styles.takeQuizWrapper}>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.left}>{assessment.assessmentName}</div>
                <ProgressBar
                  className="progressBar"
                  progress={Number((percentage * 100).toFixed(0))}
                  size={160}
                  strokeWidth={15}
                  circleOneStroke="#dadfea"
                  circleTwoStroke={"#00aaf1"}
                />
              </div>

              <div className={styles.body}>
                <div className={styles.left}>
                  <div className={styles.questionName}>{assessment.name}</div>
                  <div className={styles.questionName}>
                    {assessment.questions[activeQuestionIdx].questionName}
                  </div>
                  <div className={styles.questionBubbleWrapper}>
                    {assessment.questions.map((_, idx) => (
                      <span
                        onClick={() => setActiveQuestionIdx(idx)}
                        key={idx}
                        className={
                          activeQuestionIdx === idx
                            ? `${styles.questionBubble} ${styles.selectedBubble}`
                            : answers[idx] === null
                            ? `${styles.questionBubble}`
                            : answers[idx] ===
                              assessment.questions[idx].correctAnswer
                            ? `${styles.questionBubble} ${styles.bubbleCorrect}`
                            : `${styles.questionBubble} ${styles.bubbleInorrect}`
                        }
                      >
                        {idx + 1}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.right}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      {assessment.questions[activeQuestionIdx].questionName}
                    </FormLabel>
                    <RadioGroup
                      aria-label={
                        assessment.questions[activeQuestionIdx].questionName
                      }
                      name={
                        assessment.questions[activeQuestionIdx].questionName
                      }
                      value={answers[activeQuestionIdx]?.name}
                      onChange={(e) => selectAnswer(e.target.value)}
                    >
                      {assessment.questions[activeQuestionIdx].answers.map(
                        (answer, idx) => (
                          <FormControlLabel
                            key={idx}
                            value={idx}
                            control={<Radio />}
                            label={answer.name}
                          />
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                  <div className={styles.navBtn}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => prevQuestion()}
                      disabled={activeQuestionIdx === 0}
                    >
                      Previous
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => nextQuestion()}
                      disabled={
                        activeQuestionIdx === assessment.questions.length - 1
                      }
                    >
                      Next
                    </Button>{" "}
                    &nbsp;
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClickOpen}
                    >
                      Submit
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Submission confirmation"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure to save your response?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={handleClose}
                        >
                          Disagree
                        </Button>
                        <Button
                          color="success"
                          variant="outlined"
                          onClick={finishQuiz}
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default TakeQuiz;
