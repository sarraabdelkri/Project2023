import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import request from "umi-request";


const Verify = () => {
    const url = "https://expertise-shaper-37ut.onrender.com/api/user/is-admin"
    const navigate = useNavigate();
    const token = useSearchParams()[0].get("adminToken");

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
        <div className="h-screen w-screen flex justify-center items-center">
            <h1 className="font-extrabold text-6xl text-emerald-300/80">Verifying...</h1>
        </div>
    );
}

export default Verify;