import { useState, useEffect } from "react";

import { AppLayout } from "@/widgets/layout";
import { useNavigate, useParams } from "react-router-dom";
import courseStore from "@/store/courseStore";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import useUserStore from "@/store/userStore";
import notificationStore from "@/store/notificationStore";

function CourseContent({ courseId }) {
  const { id } = useParams();
  const getCourseById = courseStore((state) => state.getCourseById);
  const getUserById = useUserStore((state) => state.getUserById);
  const updateProgress = courseStore((state) => state.updateProgress);
  const course = courseStore((state) => state.course);
  const userid = localStorage.getItem("id");
  const [user, setUser] = useState();
  const [progress, setProgress] = useState(0);
  const [enrolledcourses, setEnrolledcourses] = useState([]);
  const navigate = useNavigate();
  const { sendNotification } = notificationStore();

  const update = async () => {
    updateProgress(userid, id, 100);
    navigate(`/assessmentByCourseName/${course.name}`);
  };


  const getuser = async () => {
    const res = await getUserById(userid);
    setUser(res.data);
    setEnrolledcourses(res.data.user.enrolledcourses);
    return res.data;
  };
  const retrieveThisCourse = () => {
    enrolledcourses.map(async (enrolledcourse) => {
      if (enrolledcourse.course._id == id) {
        setProgress(enrolledcourse.progress);
        return enrolledcourse;
      }
    });
  };
  useEffect(() => {
    retrieveThisCourse();
    getuser();
  }, []);

  useEffect(() => {
    (async () => {
      const courseData = await getCourseById(id);
    })();
  }, [getCourseById, id]);
  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AppLayout>
        <AppLayout.Header>{course.name} course</AppLayout.Header>
        <Container className="relative border-r">
          <Row className="pt-2" style={{ width: "950px", height: "500px" }}>
            <Col sm={12}>
              <video
                src={`/uploads/${course.name}.mp4`}
                controls
                width="100%"
              />
            </Col>
            <Col sm={3}>
              <button
                onClick={update}
                style={{
                  position: "absolute",
                  bottom: 210,
                  right: 8,
                  borderRadius: "50%",
                  border: "1px solid green",
                  backgroundColor: "white",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 42,
                }}
              >
                <ArrowSmallRightIcon className="h-6 w-6 text-green-500" />
              </button>
            </Col>
          </Row>
        </Container>
      </AppLayout>
    </>
  );
}
export default CourseContent;