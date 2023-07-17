import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "@components/Dashboard";
import Home from "@home/Home";
import Profile from "@user/Profile";
import Settings from "@settings/Settings";
import Users from "@users/Users";
import UsersList from "@users/components/UsersList";
import EmployerRequests from "@users/components/EmployerRequests";
import Courses from "@courses/Courses";
import CoursesList from "@courses/components/CoursesList";
import CoursesAdd from "@courses/components/CoursesAdd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Jobs from "./features/jobs/Jobs";
import JobsList from "./features/jobs/components/JobsList";
import JobsAdd from "./features/jobs/components/JobsAdd";
import JobsEdit from "./features/jobs/components/JobsEdit";
import CoursesEdit from "./features/courses/components/CoursesEdit";
import Contracts from "./features/contracts/Contracts";
import ContractsList from "./features/contracts/components/ContractsList";
import Assessments from "./features/assessments/Assessments";
import AssessmentsList from "./features/assessments/components/AssessmentsList";
import NotAuthorized from "./NotAuthorized";
import Verify from "./shared/components/Verify";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Dashboard />}>
                        <Route path="" element={<Home />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="settings" element={<Settings />} />
                        <Route
                            path="products"
                            element={
                                <h1 className="p-6 text-3xl font-extrabold">Products</h1>
                            }
                        />
                        <Route path="users" element={<Users />}>
                            <Route path="" element={<UsersList />} />
                            <Route path="employer-requests" element={<EmployerRequests />} />
                        </Route>
                        <Route path="courses" element={<Courses />}>
                            <Route path="" element={<CoursesList />} />
                            <Route path="add" element={<CoursesAdd />} />
                            <Route path="edit" element={<CoursesEdit />} />
                        </Route>
                        <Route path="jobs" element={<Jobs />}>
                            <Route path="" element={<JobsList />} />
                            <Route path="add" element={<JobsAdd />} />
                            <Route path="edit" element={<JobsEdit />} />
                        </Route>
                        <Route path="contracts" element={<Contracts />}>
                            <Route path="" element={<ContractsList />} />
                            <Route path="add" element={<JobsAdd />} />
                            <Route path="edit" element={<JobsEdit />} />
                        </Route>
                        <Route path="assessments" element={<Assessments />}>
                            <Route path="" element={<AssessmentsList />} />
                            <Route path="add" element={<JobsAdd />} />
                            <Route path="edit" element={<JobsEdit />} />
                        </Route>
                    </Route>
                    <Route path="login" element={<h1>Login</h1>} />
                    <Route path="register" element={<h1>Register</h1>} />
                    <Route path="verify" element={<Verify />} />

                    <Route
                        path="*"
                        element={
                            <NotAuthorized />
                        }
                    />
                    <Route
                        path="401"
                        element={
                            <NotAuthorized />
                        }
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
