import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"; // add this line to import the icon

export function ViewAssessment() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };
  const [assessment, setAssessment] = useState({});

  const [inputVal, setInputVal] = useState("");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  useEffect(() => {
    refreshAssessment(id);
  }, [id]);

  const refreshAssessment = (id) => {
    axios
      .get(`http://localhost:9000/assessment/getAssessment/${id}`)
      .then((res) => {
        if (res.data) {
          setAssessment(res.data.assessment);
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const addComment = () => {
    if (!inputVal.length) return;
    axios
      .post("http://localhost:9000/assessment/addComment", {
        assessmentId: id,
        message: inputVal,
        sentFrom: localStorage.getItem("name"),
      })
      .then((res) => {
        if (res.data) {
          refreshAssessment(id);
          setInputVal("");
          toast.success("Comment added");
        }
      })
      .catch((err) => toast.error(err));
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
                  {assessment.questions?.map((question, idx) => (
                    <div className="question" key={idx}>
                      {assessment.createdBy === localStorage.getItem("id") ? (
                        <>
                          <div>
                            name: &nbsp;
                            {question.questionName}
                          </div>

                          <div>
                            correct answer: &nbsp; {question.correctAnswer}
                          </div>
                        </>
                      ) : (
                        <div>Must be creator to look at questions</div>
                      )}
                    </div>
                  ))}
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
