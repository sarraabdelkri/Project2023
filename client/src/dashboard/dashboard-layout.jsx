import { Footer } from "@/widgets/layout";
import { Outlet } from "react-router";
import { Typography } from "@material-tailwind/react";

function DashboardLayout() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
