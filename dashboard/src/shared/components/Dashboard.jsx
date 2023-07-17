import { Outlet, useSearchParams } from "react-router-dom";
import Sidebar from "@components/layouts/sidebar/Sidebar";
import Navbar from "@components/layouts/navbar/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import request from "umi-request";

const Dashboard = () => {
    const url = "https://expertise-shaper-37ut.onrender.com/api/user/is-admin"
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/401");
        }
        request.post(url, {
            data: {
                token: token
            }

        }).then((res) => {
            if (res.message == "admin") {
                localStorage.setItem("token", token);
                navigate("/");
            } else {
                localStorage.removeItem("token", token);
                navigate("/401");
            }
        }).catch((err) => {
            navigate("/401");
        });
    }, []);

    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="h-full w-full xs:w-[calc(100%-7rem)] lg:w-[calc(100%-14rem)] pb-16 xs:pb-0">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
