import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Homes,
  Profile,
  SignIn,
  SignUp,
  JobsPage,
  ForgotPassword,
  ForgotSent,
  ForgotReset,
  ForgotDone,
  Jobz,
  Dashboard,
  Contract,
  Settings,
  Courses,
  AddCourses,
  CheckCourse,
  DashboardInstructor,
  AddContracts,
  EditContracts,
  AllAssessments,
  AddComment,
  PassQuiz,
} from "@/pages";
import CoursesCalendar from "@/components/courses/coursesCalendar";

import {
  DashboardLayout,
  DashboardHome,
  DashboardUsers,
  DashboardCourses,
} from "@/dashboard";
import { CreateAssessment } from "@/components/assessment";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Homes />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/jobs" element={<JobsPage />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/forgot-sent" element={<ForgotSent />} />
        <Route exact path="/reset-password" element={<ForgotReset />} />
        <Route exact path="/forgot-done" element={<ForgotDone />} />
        <Route exact path="/jobz" element={<Jobz />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route
          exact
          path="/dashboard-instructor"
          element={<DashboardInstructor />}
        />
        <Route exact path="/all-assessments" element={<AllAssessments />} />
        <Route exact path="/view-assessment" element={<AddComment />} />
        <Route exact path="/take-assessment" element={<PassQuiz />} />

        <Route exact path="/contract" element={<Contract />} />
        <Route exact path="/contracts" element={<AddContracts />} />
        <Route exact path="/edit-contracts" element={<EditContracts />} />

        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/courses" element={<Courses />} />
        <Route exact path="/course/add" element={<AddCourses />} />
        <Route path="/courses/:id" element={<CheckCourse />} />
        <Route path="/courses/calendar" element={<CoursesCalendar />} />
        {/* <Route path="/dashboard" element={<DashboardLayout />}>
          <Route exact path="" element={<DashboardHome />} />
          <Route exact path="users" element={<DashboardUsers />} />
          <Route exact path="courses" element={<DashboardCourses />} />
        </Route> */}
        <Route
          exact
          path="/create-assessment"
          element={<CreateAssessment />}
        ></Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
