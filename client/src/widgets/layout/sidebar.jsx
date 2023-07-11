import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  UserCircleIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { SidebarItem } from ".";

export function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="h-screen font-inter">
      <div className="flex h-[56px] items-center pl-2">
        <Link to="/">
          <img
            alt="EShaper"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="h-[31px] w-[120px] object-contain"
            src="/img/logo.png"
          />
        </Link>
      </div>

      <div className="mt-6 flex h-full flex-col pr-2">
        <>
          {user.role == "admin" && (
            <SidebarItem to="/jobs">
              <BriefcaseIcon className="mr-3 h-6 w-6" />
              <span className="text-center">Jobs</span>
            </SidebarItem>
          )}
          {user.role == "instructor" && (
            <SidebarItem to="/dashboard-instructor">
              <BriefcaseIcon className="mr-3 h-6 w-6" />
              <span className="text-center">Dashboard</span>
            </SidebarItem>
          )}
          {user && (
            <SidebarItem to="/all-assessments">
              <BriefcaseIcon className="mr-3 h-6 w-6" />
              <span className="text-center">Community</span>
            </SidebarItem>
          )}
          {user && (
            <SidebarItem to="/profile">
              <UserCircleIcon className="mr-3 h-6 w-6" />
              <span className="text-center">Profile</span>
            </SidebarItem>
          )}
          {user.role == "instructor" && (
            <SidebarItem to="/create-assessment">
              <BriefcaseIcon className="mr-3 h-6 w-6" />
              <span className="text-center">Add Quiz</span>
            </SidebarItem>
          )}
          {user && (
            <SidebarItem to="/settings">
              <BriefcaseIcon className="mr-3 h-6 w-6" />
              <span className="text-center">settings</span>
            </SidebarItem>
          )}

          {user.role == "student" && (
            <SidebarItem to="/courses">
              <CubeIcon className="mr-3 h-6 w-6" />
              <span className="text-center">Courses</span>
            </SidebarItem>
          )}

          {user.role == "student" && (
            <SidebarItem to="/contract">
              <CubeIcon className="mr-3 h-6 w-6" />
              <span className="text-center">Contract</span>
            </SidebarItem>
          )}
        </>
      </div>
    </div>
  );
}

export default Sidebar;
