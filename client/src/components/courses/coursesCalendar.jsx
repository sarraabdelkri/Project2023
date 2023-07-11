import React, { useState, useEffect } from "react";
import moment from "moment";
import { AppLayout } from "@/widgets/layout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css"
import courseStore from "@/store/courseStore";
const localizer = momentLocalizer(moment);

function CoursesCalendar() {
  const [courses, setCourses] = useState([]);
  const getCourseById = courseStore((state) => state.getCourseById);
  const enrolledcourses = JSON.parse(localStorage.getItem("enrolledcourses"));
  const course = courseStore((state) => state.course);
  const courseIds = enrolledcourses.map((course) => course.course);

  useEffect(() => {
    setCourses(enrolledcourses);
  }, []);
  useEffect(() => {
    const fetchCourse = async () => {
      const courses = [];
      courseIds.forEach(async (courseId) => {
        const course = await getCourseById(courseId);
        courses.push(course);
      });
      setCourses(courses);
    };
    fetchCourse();
  }, []);

  const events =
    courses &&
    courses.map((course) => ({
      title: course.name,
      start: new Date(course.startdate),
      end: new Date(course.enddate),
    }));

  return (
    <AppLayout>
      <AppLayout.Header>Courses Calendar</AppLayout.Header>
      <AppLayout.Content>
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={(event, start, end, isSelected) => {
              const backgroundColor = "#f0ad4e";
              return { style: { backgroundColor } };
            }}
            onSelectEvent={() => window.location.href = '/courses'}
          />
        </div>
      </AppLayout.Content>
    </AppLayout>
  );
}

export default CoursesCalendar;
