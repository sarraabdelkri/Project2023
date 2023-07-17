import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Results.module.css";
import { useNavigate } from "react-router-dom";
import Result from "./result";

export function Results() {
    const [assessments, setAssessments] = useState([]);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const checkUser = () => {
        if (!user) {
            navigate("/sign-in");
        }
    }

    useEffect(() => {
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
        checkUser();
    }, []);

    return (
        <div className={styles.scrollContainer}>
            {assessments.map((assessment, index) => (
                <Result
                    key={assessment._id}
                    assessment={assessment}
                    result={results[index]}
                />
            ))}
        </div>
    );
}

export default Results;
