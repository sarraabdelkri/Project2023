import { AppLayout } from "@/widgets/layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [createdAt, setCreatedAt] = useState("");

  const prepareDate = () => {
    const date = new Date(user?.createdAt);
    // format to DD month YYYY
    const createdAt = `${date.getDate()} ${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getFullYear()}`;
    setCreatedAt(createdAt);
  };

  const checkUser = () => {
    if (!user) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    checkUser();
    prepareDate();
  }, []);

  return (
    <AppLayout>
      <AppLayout.Header>Profile</AppLayout.Header>
      <AppLayout.Content>
        <div className="flex h-full flex-col items-center pt-10">
          <div className="flex flex-col items-center">
            <UserCircleIcon className="h-20 w-20 text-gray-800" />
            <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          </div>
          <div className="mt-16 flex items-center">
            <h1 className="text-5xl font-bold tracking-widest text-gray-800">
              {user.name}
            </h1>
          </div>
          <div className="mt-16 flex items-center">
            <h1 className="text-2xl text-gray-600">{user.email}</h1>
          </div>
          <div className="mt-16 flex items-center">
            <h1 className="text-xl font-bold tracking-widest text-gray-800">
              Created {createdAt}
            </h1>
          </div>
          <div className="mt-16 flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
            <h1 className="ml-2 text-xl font-bold tracking-widest text-gray-800">
              Verified
            </h1>
          </div>
        </div>
      </AppLayout.Content>
    </AppLayout>
  );
}

export default Profile;
