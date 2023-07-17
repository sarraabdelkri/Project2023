import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { TextField, Autocomplete, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import courseStore from "@/store/courseStore";
const styless = {
    input: {
        fontSize: "14px", // adjust font size as desired
        padding: "1px 7px",
        marginBottom: 10, // adjust padding as desired
    },
};
export function CreateAssessment() {
    const fetchCourses = courseStore((state) => state.fetchCourses);
    const courses = courseStore((state) => state.courses);
    const [courseNames, setCourseNames] = useState([]);
    const [courseName, setCourseName] = useState();

    const user = JSON.parse(localStorage.getItem("user"));

    const checkUser = () => {
        if (!user) {
            navigate("/");
        }
    }
    useEffect(() => {
        fetchCourses();
        checkUser();
    }, []);

    useEffect(() => {
        if (courses) {
            const names = courses.map((course) => course.name);
            setCourseNames(names);
        }
    }, [courses]);

    const navigate = useNavigate();
    const [categories] = useState([
        "Algorithms and Data Structures",
        "Artificial Intelligence",
        "Computer Architecture",
        "Computer Graphics",
        "Computer Networks",
        "Computer Security and Cryptography",
        "Computer Systems and Operating Systems",
        "Database Systems",
        "Human-Computer Interaction",
        "Machine Learning",
        "Programming Languages",
        "Software Engineering",
        "Web Development",
    ]);
    const [categoryVal, setCategoryVal] = useState();
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
        if (!questionName || answers.length < 2 || !correctAnswer) {
            toast.error("Please fill all the fields!");
            return;
        }
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

    const defaultImgUrl =
        "https://img.freepik.com/vecteurs-libre/ordinateur-portable-icone-isometrique-code-programme-developpement-logiciels-applications-programmation-neon-sombre_39422-971.jpg?w=740&t=st=1681575884~exp=1681576484~hmac=14266b6e7211c7887929793d87fd5124c454a52058fdcec8548d2ce20187ecb0";
    const imageUrl = imgUrl || defaultImgUrl;
    const saveQuiz = () => {
        if (!name) {
            toast.error("Please enter a quiz name!");
            return;
        }
        if (!categoryVal) {
            toast.error("Please enter a categoryVal!");
            return;
        }
        if (!courseName) {
            toast.error("Please enter a course name!");
            return;
        }
        let assessment = {
            name: name,
            questions: questions,
            category: categoryVal,
            courseName: courseName,
            imgUrl: imageUrl,
        };
        axios
            .post("https://expertise-shaper-37ut.onrender.com/api/assessment/createAssessment", {
                assessment,
                createdBy: localStorage.getItem("id"),
            })
            .then((res) => {
                if (res.data.success) {
                    setQuestions([]);
                    setName("");
                    setAnswers([]);
                    setCategoryVal();
                    setImgUrl("");
                    setCourseName("");
                    setTimeout(() => {
                        navigate("/dashboard-instructor");
                    }, 3000);
                    toast.success("Quiz saved successfully!");
                }
            })
            .catch((er) => {
                console.error(er);
                toast.error("All inputs are required !");
            });
    };

    return (
        <div className={styles.create}>
            <div className={styles.main}>
                <div className={`${styles.form}`}>
                    <TextField
                        label="Quiz Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{ style: styless.input }}
                    />
                    <br></br>
                    <TextField
                        InputProps={{ style: styless.input }}
                        label="Img url"
                        variant="outlined"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                    <br></br>
                    <Autocomplete
                        id="category-autocomplete"
                        options={categories}
                        getOptionLabel={(option) => option}
                        value={categoryVal}
                        onChange={(event, newValue) => {
                            setCategoryVal(newValue);
                        }}
                        style={{
                            margin: "1px 0 ",
                        }}
                        sx={{
                            width: "70%",
                            height: "50px",
                        }}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                        disabled={categories.length === 0}
                    />
                    <Autocomplete
                        id="category-autocomplete"
                        options={courseNames}
                        getOptionLabel={(option) => option}
                        value={courseName}
                        onChange={(event, newValue) => {
                            setCourseName(newValue);
                        }}
                        style={{
                            margin: "25px 0 ",
                        }}
                        sx={{
                            width: "70%",
                            height: "50px",
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Course Name" />
                        )}
                        disabled={courseNames.length === 0}
                    />{" "}
                    <div>
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
                                            </Button>{" "}
                                            &nbsp;
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
                                    <>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => setAddQuestion(true)}
                                        >
                                            Add Question
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
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
    );
}
export default CreateAssessment;
