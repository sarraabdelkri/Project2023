import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./viewResults.module.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "@/components/results/pdfFile";

export function ViewResults() {
    const [result, setResult] = useState(null);
    const [assessment, setAssessment] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
        };

        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    useEffect(() => {
        if (!localStorage.getItem("id")) {
            navigate("/");
        } else {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (!id) {
                navigate("/");
            } else {
                axios.get("https://expertise-shaper-37ut.onrender.com/api/result/results/" + id).then((res) => {
                    setResult(res.data.score);
                    setAssessment(res.data.assessment);
                });
            }
        }
    }, []);

    const getBorderLeft = (idx) => {
        if (result.answers[idx]) {
            return "5px solid green";
        } else {
            return "5px solid red";
        }
    };

    const getScore = () => {
        let len = result.answers.length;
        let right = result.answers.filter((ans) => ans === true);
        return 100 * (right.length / len) + "%";
    };

    return (
        <div className={styles.scrollContainer}>
            <div className={styles.viewResultsWrapper}>
                {/*       <div>
        <Sidebar />
      </div> */}
                {assessment && result && (
                    <div className={styles.body}>
                        <div className={styles.quizData}>
                            <div className={styles.left}>
                                <div className={styles.header}>{assessment.name}</div>
                                <div className={styles.category}>{assessment.category}</div>
                                <div className="comments">
                                    {assessment.comments.length} Comments
                                </div>
                            </div>
                            <div className={styles.center}>
                                <img
                                    src={
                                        assessment.imgUrl
                                            ? assessment.imgUrl
                                            : "https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                                    }
                                    alt={assessment.name}
                                    width="50px"
                                    height="50px"
                                />
                            </div>
                            <div className="right">
                                <div className="likes">{assessment.likes} Likes</div>
                                <div className="others">
                                    {assessment.scores.length} Other people have taken this quiz
                                </div>
                            </div>
                        </div>

                        <div className={styles.score}>Score: {getScore()}</div>
                        {parseInt(getScore(result)) > 50 && (
                            <PDFDownloadLink
                                document={
                                    <PDFFile
                                        score={getScore(result)}
                                        assessment={assessment}
                                        result={result}
                                    />
                                }
                                fileName={`Assessment_${assessment.name}.pdf`}
                                className={styles.downloadButton}
                            >
                                {({ loading }) =>
                                    loading ? (
                                        <button>Loading Document...</button>
                                    ) : (
                                        <button>Download</button>
                                    )
                                }
                            </PDFDownloadLink>
                        )}
                        <div className={styles.answers}>
                            {assessment.questions.map((q, idx) => (
                                <div
                                    key={idx}
                                    className={styles.answer}
                                    style={{ borderLeft: getBorderLeft(idx) }}
                                >
                                    <div>{q.questionName}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewResults;
