import { Outlet } from "react-router-dom";

const Jobs = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Jobs</h1>
      <div className="pt-6 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Jobs;
