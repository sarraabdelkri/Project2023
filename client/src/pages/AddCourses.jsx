import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddCourse } from "../../../client/src/components/courses/addCourse";
import { AppLayout } from "@/widgets/layout";
export function AddCourses() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const checkUser = () => {
    if (!user) {
      navigate("/sign-in");
    } else if (user.role !== "instructor") {
      navigate("/");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      <AppLayout>
        <AppLayout.Header>Add Course</AppLayout.Header>
        <AppLayout.Content>
          <AddCourse />
        </AppLayout.Content>
      </AppLayout>
    </>
  );
}

export default AddCourses;
