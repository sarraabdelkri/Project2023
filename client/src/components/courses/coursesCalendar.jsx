import React, { useState, useEffect } from "react";
import { AppLayout } from "@/widgets/layout";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import courseStore from "@/store/courseStore";
import { Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const localizer = momentLocalizer(moment);
function CoursesCalendar() {
  const [courses, setCourses] = useState([]);
  const getCourseById = courseStore((state) => state.getCourseById);
  const getEnrolledCourses = courseStore((state) => state.getEnrolledCourses);
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user ? user._id : null;
  const navigate=useNavigate()
  const getCourses = async () => {
    const enrolledCourses = await getEnrolledCourses(userid);
    const courseDetails = await Promise.all(
      enrolledCourses.map(async (course) => {
        const courseDetails = await getCourseById(course.course);
        return {
          ...courseDetails,
          progress: course.progress,
          completed: course.completed,
          enrolledCourseId: course._id,
        };
      })
    );
    setCourses(courseDetails);
  };
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
    getCourses();
  }, []);
  const events =
    courses &&
    courses.map((course) => ({
      title: course.name,
      start: new Date(course.startdate),
      end: new Date(course.enddate),
    }));
  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = isSelected ? "#31708f" : "#f0ad4e";
    const color = isSelected ? "#fff" : "#000";
    const style = {
      backgroundColor,
      color,
      borderRadius: "10px",
      border: "none",
    };
    return {
      style,
    };
  };
  return (
    <AppLayout>
      <AppLayout.Header>Courses Calendar</AppLayout.Header>
      <AppLayout.Content>
        <Card className="pt-3">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={() => (window.location.href = `/courses`)}
          />
        </Card>
      </AppLayout.Content>
    </AppLayout>
  );
}

export default CoursesCalendar;
