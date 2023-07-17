import {
    ChevronDownIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    QueueListIcon,
    CalendarIcon,
    BookOpenIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import courseStore from "@/store/courseStore";

export function UserDropdown({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const updateSession = courseStore((state) => state.updateSession);
    const userId = localStorage.getItem("id")
    const handleLogout = () => {
        updateSession(userId)
        logout();
        navigate("/sign-in");
    };

    return (
        <div className="relative ">
            <div
                className="z-10 cursor-pointer rounded-md border border-gray-300 px-4  py-2 hover:bg-gray-400/10 ml-9"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
            >
                <div className="flex select-none items-center gap-2 font-medium text-gray-900">
                    <ChevronDownIcon className="h-5 w-5 " />
                    {user.name}
                </div>
            </div>
            <div
                className={`absolute right-0 top-11 z-10 w-48 rounded-md border border-gray-300 bg-white py-1 shadow-lg ${isOpen ? "block" : "hidden"
                    }`}
            >
                <div className="px-4 py-2">
                    <div className="flex justify-center rounded border border-green-200 bg-green-600/10 px-2 py-1">
                        <span className="text-xs font-medium uppercase italic text-blue-gray-800">
                            {user.role}
                        </span>
                    </div>
                </div>
                <div className="border-t-1 h-[1px] w-full bg-gray-200"></div>

                <Link
                    to="/profile"
                    className="flex gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    <UserCircleIcon className="h-5 w-5" />
                    Profile
                </Link>
                <div className="border-t-1 h-[1px] w-full bg-gray-200"></div>

                <Link
                    to="/settings"
                    className="flex gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    <Cog6ToothIcon className="h-5 w-5" />
                    Settings
                </Link>
                {user.role == "admin" && (
                    <>
                        <div className="border-t-1 h-[1px] w-full bg-gray-200"></div>
                        <a
                            href={`https://expertise-dashboard.vercel.app/verify?adminToken=${localStorage.getItem("token")}`}
                            className="flex gap-2 px-4 py-2 text-sm font-medium text-purple-800 hover:bg-gray-100"
                        >
                            <QueueListIcon className="h-5 w-5" />
                            Dashboard
                        </a>
                    </>
                )}
                {user.role == "student" && (
                    <>
                        <div className="border-t-1 h-[1px] w-full bg-gray-200"></div>
                        <Link
                            to="/courses/myenrolledcourses"
                            className="flex gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            <BookOpenIcon className="h-5 w-5" />
                            My courses
                        </Link>
                    </>
                )}
                {user.role == "student" && (
                    <>
                        <div className="border-t-1 h-[1px] w-full bg-gray-200"></div>
                        <Link
                            to="/courses/calendar"
                            className="flex gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            <CalendarIcon className="h-5 w-5" />
                            Calendar
                        </Link>
                    </>
                )}
                {user.role == "instructor" && (
                    <>
                        <div className="border-t-1 h-[1px] w-full bg-gray-200"></div>
                        <Link
                            to="/dashboard-instructor"
                            className="flex gap-2 px-4 py-2 text-sm font-medium text-purple-800 hover:bg-gray-100"
                        >
                            <QueueListIcon className="h-5 w-5" />
                            Dashboard
                        </Link>
                    </>
                )}
                <div className="border-t-1 h-[1px] w-full bg-gray-200"></div>
                <div
                    className="flex cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-red-300 hover:bg-gray-100"
                    onClick={() => handleLogout()}
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    Logout
                </div>
            </div>
            {isOpen && (
                <div
                    className="fixed left-0 top-0 z-0 h-screen w-screen"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default UserDropdown;
