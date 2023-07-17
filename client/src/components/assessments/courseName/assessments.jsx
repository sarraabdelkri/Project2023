import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Assessment from "./assessment";
import { toast } from "react-toastify";
import axios from "axios";
import { AppLayout } from "@/widgets/layout";
import { Card, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import courseStore from "../../../store/courseStore";

export function AssessmentsList() {
    const { courseName } = useParams();
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        const getAssessmentsByCourseName = async () => {
            try {
                const response = await axios.get(
                    `https://expertise-shaper-37ut.onrender.com/api/assessment/getAssessmentsByCourseName/${courseName}`
                );
                setAssessments(response.data.assessments);
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching assessments.", {
                    autoClose: 3000,
                });
            }
        };
        getAssessmentsByCourseName();
    }, [courseName]);

    if (!assessments) {
        return <div>Loading...</div>;
    }




    //added
    const navigate = useNavigate();

    useEffect(() => {
      getCoursesDetails();
    }, []);
    
    const getEnrolledCourses = courseStore((state) => state.getEnrolledCourses);
    const getCourseById = courseStore((state) => state.getCourseById);
    const getIdCourseByCourseName = courseStore((state) => state.getIdCourseByCourseName);
    const [enrolledCourses, SetEnrolledCourses] = useState([]);

    const fetchCourseById = async (id) => {
      const course = await getCourseById(id);
      return course;
    };
    
    const user = JSON.parse(localStorage.getItem("user"));
    const connectedUserId = user ? user._id : null;
    
    const getCoursesDetails = async () => {
      const response = await getEnrolledCourses(connectedUserId);
      if (response) {
        const courses = await Promise.all(
          response.map(async (course) => {
            const courseDetails = await fetchCourseById(course.course);
            return {
              ...courseDetails,
            };
          })
        );
        SetEnrolledCourses(courses);
    
        // Call checkIfCourseEnrolled after setting the enrolledCourses state
        const isEnrolled = checkIfCourseEnrolled(courses);
        if (!isEnrolled) {
          navigate('/courses');
        }
      }
    };
    
    const checkIfCourseEnrolled = (courses) => {
      const enrolled = courses?.map(enrolledCourse => enrolledCourse.name === courseName);
      return enrolled && enrolled.includes(true);
    };
    

    return (
        <>
            <AppLayout>
                <AppLayout.Header>Quizz</AppLayout.Header>
                <AppLayout.Content>
                    <Container >
                        <Row >
                            <div className="h-full  px-6 pb-10 pt-4 mt-9">
                                {assessments?.map((assessment, i) => {
                                    return (
                                        <div className="mb-3" key={i}>
                                            <Assessment assessment={assessment} />
                                        </div>
                                    );
                                })}
                            </div>
                        </Row>
                    </Container>
                </AppLayout.Content>
            </AppLayout>
        </>
    );
}

export default AssessmentsList;
