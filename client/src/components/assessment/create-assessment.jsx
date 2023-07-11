import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { AppLayout } from "@/widgets/layout";
import { toast } from "react-toastify";
import { TextField, Autocomplete, Button } from "@mui/material";

export function CreateAssessment(props) {
  const [categories] = useState(["AI", "DS", "POO", "DBA", "RX", "BI"]);
  const [categoryVal, setCategoryVal] = useState("");
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");
  const [addQuestion, setAddQuestion] = useState(false);
  const [questionName, setQuestionName] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const addAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const updateAnswer = (e, i) => {
    let newArr = [...answers];
    newArr[i] = e.target.value;
    setAnswers(newArr);
  };

  const saveQuestion = () => {
    let question = {
      answers: answers,
      correctAnswer: correctAnswer,
      questionName: questionName,
    };
    setQuestions([...questions, question]);
    setAddQuestion(false);
    setQuestionName("");
    setAnswers([]);
    setCorrectAnswer("");
  };

  const removeQuestion = (question) => {
    setQuestions(
      questions.filter((ques) => ques.questionName !== question.questionName)
    );
  };

  const saveQuiz = () => {
    let assessment = {
      name: name,
      questions: questions,
      category: categoryVal,
      imgUrl: imgUrl,
    };
    axios
      .post("http://localhost:9000/assessment/createAssessment", {
        assessment,
        createdBy: localStorage.getItem("id"),
      })
      .then((res) => {
        if (res.data.success) {
          setQuestions([]);
          setAnswers([]);
          setCategoryVal("POO");
          setImgUrl(
            "https://img.freepik.com/vecteurs-libre/ordinateur-portable-icone-isometrique-code-programme-developpement-logiciels-applications-programmation-neon-sombre_39422-971.jpg?w=740&t=st=1680881067~exp=1680881667~hmac=b8aa369f33162c992935bb7afb8861db1a1392f1e30adb64fe043ce451a003fc"
          );
          toast.success("Quiz saved successfully!");
        }
      })
      .catch((er) => {
        console.error(er);
        toast.error("Error");
      });
  };

  return (
    <AppLayout>
      <AppLayout.Header>Add Quiz</AppLayout.Header>

      <div
        className={styles.create}
        style={{ height: "500px", overflow: "auto" }}
      >
        <div className={styles.main}>
          <div className={`${styles.form} ${styles.card}`}>
            {/* <input
              className={styles.input}
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Quiz Name"
            />
            <br></br>
            <input
              className={styles.input}
              onChange={(e) => setImgUrl(e.target.value)}
              value={imgUrl}
              placeholder="Img url"
            /> */}
            <TextField
              className={styles.input}
              label="Quiz Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            <TextField
              className={styles.input}
              label="Img url"
              variant="outlined"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />

            <br></br>
            {/* <select
              value={categoryVal}
              onChange={(e) => setCategoryVal(e.target.value)}
              className={`${styles.input2} ${styles.select}`}
              placeholder="Category"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select> */}
            <Autocomplete
              id="category-autocomplete"
              options={categories}
              getOptionLabel={(option) => option}
              value={categoryVal}
              onChange={(event, newValue) => {
                setCategoryVal(newValue);
              }}
              style={{
                margin: "25px 0 ",
              }}
              sx={{
                width: "20%", // set the width to 100% of its container
                height: "50px", // set the height to 40px
              }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
            <div className={styles.questionContainer}>
              <div className={styles.header}>Questions</div>
              <div className={styles.questionList}>
                {questions.map((question, index) => (
                  <div key={index} className={styles.question}>
                    <div className={styles.questionHeader}>
                      <span>
                        {index + 1}. {question.questionName}
                      </span>
                      <span
                        onClick={() => removeQuestion(question)}
                        className={styles.delete}
                      >
                        X
                      </span>
                    </div>
                    <div className={styles.answers}>
                      {question.answers.map((answer, ansIdx) => (
                        <div key={ansIdx} className={styles.answer}>
                          <input
                            type="radio"
                            checked={answer === question.correctAnswer}
                            disabled
                          />
                          <span>{answer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.addQuestionContainer}>
                {addQuestion ? (
                  <div className={styles.addQuestion}>
                    <input
                      className={styles.input}
                      onChange={(e) => setQuestionName(e.target.value)}
                      value={questionName}
                      placeholder="Question"
                    />
                    <div className={styles.answerList}>
                      {answers.map((answer, index) => (
                        <div key={index} className={styles.answer}>
                          <input
                            type="radio"
                            checked={answer === correctAnswer}
                            onChange={() => setCorrectAnswer(answer)}
                          />
                          <input
                            className={styles.input2}
                            onChange={(e) => updateAnswer(e, index)}
                            value={answer}
                            placeholder={`Answer ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className={styles.buttonContainer}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => addAnswer()}
                      >
                        Add Answer
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => saveQuestion()}
                      >
                        Save Question
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setAddQuestion(true)}
                  >
                    Add Question
                  </Button>
                )}
              </div>
            </div>

            {/* <button onClick={() => saveQuiz()} className={styles.button}>
              Create Quiz
            </button> */}
            <br />
            <br />
            <Button
              variant="contained"
              color="success"
              onClick={() => saveQuiz()}
            >
              Create Quiz
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default CreateAssessment;
