import { UserDropdown } from "@/components/user";
import { Link } from "react-router-dom";
import { Sidebar } from ".";
import { PrimaryButton, SecondaryButton } from "../buttons";
import RequestEmployerProfile from "../../pages/requestEmployer";
import PostJob from "../../pages/PostJob";

export function AppLayout({ children }) {
  return (
    <div className="flex h-screen justify-center overflow-hidden">
      <div className="hidden h-screen w-[210px] xl:block">
        <Sidebar />
      </div>
      <div className="h-full w-[990px] border-l border-gray-300 ">
        {children}
      </div>
    </div>
  );
}

AppLayout.Header = function AppLayoutHeader({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex h-[56px] w-full border-b border-r border-gray-300">
      <div className="flex w-[640px] flex-shrink-0 items-center border-r border-gray-300 px-6 ">
        <span className="font-medium">{children}</span>
      </div>
      <div className="flex w-[350px] flex-shrink-0 items-center justify-end px-6">
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <>
            <Link to="/sign-in" className="mr-5">
              <SecondaryButton>Sign In</SecondaryButton>
            </Link>
            <Link to="/sign-up">
              <PrimaryButton>Join Us</PrimaryButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

AppLayout.Content = function AppLayoutContent({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex">
      <div className="h-screen w-[640px] flex-shrink-0 border-r border-gray-300">
        {children}
      </div>
      <div className="h-screen w-[350px] flex-shrink-0 border-r border-gray-300 p-6">
        {user.role === "student" &&
          <RequestEmployerProfile> </RequestEmployerProfile>
        }
        {user.role === "employer" && <PostJob />}
      </div>
    </div>
  );
};

export default AppLayout;
