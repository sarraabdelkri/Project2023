import { Link } from "react-router-dom";
import {
    BriefcaseIcon,
    UserCircleIcon,
    WrenchScrewdriverIcon,
    FolderPlusIcon,
    ArrowUpTrayIcon,
    SquaresPlusIcon,
    NewspaperIcon,
    CubeIcon,
    BookmarkIcon,
    EnvelopeIcon,
    ChartPieIcon,
    VideoCameraIcon, ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";
import { SidebarItem } from ".";

export function Sidebar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = localStorage.getItem("id");

    return (
        <div className="h-screen font-inter ml-6">
            <div className="flex h-[56px] items-center pl-2 ml-7">
                <Link to={"/homes"}>
                    <img
                        alt="EShaper"
                        loading="lazy"
                        decoding="async"
                        data-nimg="1"
                        className="h-[43px] w-[136px] object-contain pl-4"
                        src="/img/logo.png"
                    />
                </Link>
            </div>
            <div className="mt-1 flex h-full flex-col pr-2">
                <>
                    <div className=" flex h-full flex-col pl-4 ml-6" >
                        <SidebarItem to="/jobs" style={{ paddingLeft: "1rem" }}>
                            <BriefcaseIcon className="mr-3 h-6 w-6" />
                            <span className="text-center">Jobs</span>
                        </SidebarItem>
                        <SidebarItem to="/courses" style={{ paddingLeft: "1rem" }}>
                            <BookmarkIcon className="mr-3 h-6 w-6" />
                            <span className="text-center">Courses</span>
                        </SidebarItem>
                        {user && user.role == "student" && (
                            <SidebarItem className="ml-7" to="/results" style={{ paddingLeft: "1rem" }}>
                                <ChartPieIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Results</span>
                            </SidebarItem>
                        )}

                        {user && user && (
                            <SidebarItem to="/profile" style={{ paddingLeft: "1rem" }}>
                                <UserCircleIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Profile</span>
                            </SidebarItem>
                        )}
                        {user && user && (
                            <SidebarItem to="/settings" style={{ paddingLeft: "1rem" }}>
                                <WrenchScrewdriverIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Settings</span>
                            </SidebarItem>
                        )}
                        {user && user.role == "instructor" && (
                            <SidebarItem
                                to="/dashboard-instructor"
                                style={{ paddingLeft: "1rem" }}
                            >
                                <SquaresPlusIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">My Quizzes</span>
                            </SidebarItem>
                        )}
                        {user && user.role == "instructor" && (
                            <SidebarItem to="/all-assessments" style={{ paddingLeft: "1rem" }}>
                                <SquaresPlusIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Quiz</span>
                            </SidebarItem>
                        )}

                        {user && user.role == "instructor" && (
                            <SidebarItem to="/create-assessment" style={{ paddingLeft: "1rem" }}>
                                <FolderPlusIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Add Quiz</span>
                            </SidebarItem>
                        )}
                        {user && user.role == "instructor" && (
                            <SidebarItem to="/add-course" style={{ paddingLeft: "1rem" }}>
                                <ArrowUpTrayIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Add Course</span>
                            </SidebarItem>
                        )}

                        {user && user.role == "employer" && (
                            <SidebarItem to="/jobBoard">
                                <SquaresPlusIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Job Board</span>
                            </SidebarItem>
                        )}
                        {user && user.role == "employer" && (
                            <SidebarItem to="/contract/calendar">
                                <CubeIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Calender</span>
                            </SidebarItem>
                        )}
                        {/* {user && user.role == "student" && (
              <SidebarItem to="/pdfContract">
                <NewspaperIcon className="mr-3 h-6 w-6" />
                <span className="text-center">Contracts</span>
              </SidebarItem>
            )} */}



                        {user && user.role == "employer" && (
                            <SidebarItem to="/contract" style={{ paddingLeft: "1rem" }}>
                                <CubeIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Contract</span>
                            </SidebarItem>
                        )}
                        {user && user.role == "student" && (
                            <SidebarItem to="/videoplayer" style={{ paddingLeft: "1rem" }}>
                                <VideoCameraIcon className="mr-3 h-6 w-6" />
                                <span className="text-center">Youtube</span>
                            </SidebarItem>
                        )}

                        <SidebarItem to="/chat" style={{ paddingLeft: "1rem" }}>
                            <ChatBubbleBottomCenterTextIcon className="mr-3 h-6 w-6" />
                            <span className="text-center">Chat Bot</span>
                        </SidebarItem>


                    </div>
                </>

            </div>
        </div>

    );
}

export default Sidebar;