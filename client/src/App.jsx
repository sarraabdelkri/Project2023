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
    CheckCourse,
    DashboardInstructor,
    AddContracts,
    EditContracts,
    DetailContracts,
    Reviews,
    AllAssessments,
    AddComment,
    PassQuiz,
    ViewResultAssessments,
    CreateQuiz,
    AddCourses,
    EnrolledCourses,
    MyResults,
    Chat,
    OtherJobsPage
} from "@/pages";
import { AssessmentsList } from "@/components/assessments/courseName/assessments";
import CoursesCalendar from "@/components/courses/coursesCalendar";
import CourseContent from "@/components/courses/courseContent";
import { CreateAssessment } from "@/components/assessment/createAssessment/create-assessment";
import JobApplicants from "./components/jobs/JobApplicants";
import JobDetails from "./components/jobs/jobDetails";
import EditJob from "./components/jobs/EditJob";
import JobBoard from "./components/jobs/jobBoard";
import ContractsCalendar from "@/components/contract/calanderContract";
import PdfContract from "@/components/contract/pdfContract";
// import Results from "@/components/results/results";
import VideoPlayer from './components/youtube/VideoPlayer';
// import ChatGpt from "@/components/chat/chat";
import Notificationslist from "./components/notification/Notificationslist";
import Wishlist from "./components/courses/Wishlist";
import ReactGA from "react-ga";
const trackingId = "UA-261117397-1";
ReactGA.initialize(trackingId);
const user = JSON.parse(localStorage.getItem("user"));

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/home" element={<Homes />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/jobs" element={<JobsPage />} />
                <Route exact path="/other-jobs" element={<OtherJobsPage />} />
                <Route exact path="/sign-in" element={<SignIn />} />
                <Route exact path="/sign-up" element={<SignUp />} />
                <Route exact path="/forgot-password" element={<ForgotPassword />} />
                <Route exact path="/forgot-sent" element={<ForgotSent />} />
                <Route exact path="/reset-password" element={<ForgotReset />} />
                <Route exact path="/forgot-done" element={<ForgotDone />} />
                <Route exact path="/jobz" element={<Jobz />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/chat" element={<Chat />} />

                <Route
                    exact
                    path="/dashboard-instructor"
                    element={<DashboardInstructor />}
                />
                <Route exact path="/all-assessments" element={<AllAssessments />} />
                <Route exact path="/view-assessment" element={<AddComment />} />
                <Route exact path="/take-assessment" element={<PassQuiz />} />
                <Route exact path="/view-results" element={<ViewResultAssessments />} />

                <Route exact path="/contract" element={<Contract />} />
                <Route exact path="/contracts" element={<AddContracts />} />
                <Route exact path="/edit-contracts/:id" element={<EditContracts />} />
                <Route exact path="/detail-contracts/:id" element={<DetailContracts />} />
                <Route
                    exact
                    path="/pdfContract"
                    element={<PdfContract />}
                />
                <Route path="/contract/calendar" element={<ContractsCalendar />} />
                <Route exact path="/review/:id/reviews/:userId" element={<Reviews />} />
                <Route path="/videoplayer" element={<VideoPlayer />} />

                {user &&
                    <Route
                        exact
                        path="/assessmentByCourseName/:courseName"
                        element={<AssessmentsList />}
                    />}

                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/courses" element={<Courses />} />
                <Route exact path="/add-course" element={<AddCourses />} />
                <Route path="/courses/:id" element={<CheckCourse />} />
                <Route path="/courses/calendar" element={<CoursesCalendar />} />
                <Route path="/notifications" element={<Notificationslist />} />
                <Route path="/wishList" element={<Wishlist />} />
                <Route exact path="/create-assessment" element={<CreateQuiz />}></Route>
                <Route
                    path="/courses/myenrolledcourses"
                    element={<EnrolledCourses />}
                />
                <Route path="/courses/courseContent/:id" element={<CourseContent />} />
                <Route path="/results" element={<MyResults />} />

                <Route
                    exact
                    path="/create-assessment"
                    element={<CreateAssessment />}
                ></Route>
                <Route path="/job/:id" element={<JobDetails />} />
                <Route path="/jobBoard" element={<JobBoard />} />
                <Route path="/job/:id/edit" element={<EditJob />} />
                <Route path="/job/:id/applicants" element={<JobApplicants />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default App;
