import React from "react";
import styles from "./Results.module.css";
import PDFFile from "./pdfFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PrimaryButton } from "@/widgets/buttons";

export function Result({ assessment, result }) {
  const getBorderLeft = (idx, result) => {
    if (result && result.answers[idx]) {
      return "5px solid green";
    } else {
      return "5px solid red";
    }
  };

  const getScore = (result) => {
    let len = result.answers.length;
    let right = result.answers.filter((ans) => ans === true);
    return 100 * (right.length / len) + "%";
  };

  return (
    <>
      <div className={styles.viewResultsWrapper}>
        <div className={styles.body}>
          <div className={styles.header}>Assessment "{assessment.name}"</div>
          <div className={styles.quizData}>
            <div className={styles.left}>
              <div className={styles.header}>{assessment.name}</div>
              <div className={styles.category}>{assessment.category}</div>
              <div className="comments">
                {assessment && assessment.comments
                  ? `${assessment.comments.length} Comments`
                  : ""}
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

          <div className={styles.score}>Score: {getScore(result)}</div>
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
            >
              <PrimaryButton>Download</PrimaryButton>
            </PDFDownloadLink>
          )}

          <div className={styles.answers}>
            {assessment.questions.map((q, idx) => (
              <div
                key={idx}
                className={styles.answer}
                style={{ borderLeft: getBorderLeft(idx, result) }}
              >
                <div>{q.questionName}</div>
                <div>{result.answers[idx] ? "Correct" : "Incorrect"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
