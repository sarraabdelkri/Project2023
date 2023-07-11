import { PrimaryButton } from "@/widgets/buttons";
import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "@/widgets";
export function SignIn() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/jobs");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    try {
      setLoading(true);
      await login(email, password).then(() => {
        navigate("/jobs");
      });
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg">
      <div className="bg-orange-mist flex h-screen w-full flex-1 flex-col items-center justify-between p-0 sm:p-20">
        <div className="flex-1"></div>
        <div className="border-orange-light w-full flex-1 rounded-lg border bg-white p-4 shadow-lg sm:w-[400px] sm:p-10">
          <div className="mb-10 flex justify-center">
            <Link aria-label="ES" to="/">
              <img
                alt="ES Logo"
                loading="lazy"
                width="150"
                height="150"
                decoding="async"
                src="/img/logo.png"
              />
            </Link>
          </div>
          <h1 className="mb-8 text-center	text-2xl font-medium">Sign In</h1>
          <button
            className="leading-120 mb-3 flex h-10 w-full select-none items-center justify-center rounded border border-gray-500 bg-white px-6 text-center text-base  tracking-wide   transition-all duration-75 ease-in hover:bg-gray-500/10 disabled:cursor-not-allowed disabled:opacity-50 "
            type="button"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_12302_63595)">
                <path
                  d="M20.4893 10.1873C20.4893 9.36791 20.4213 8.76998 20.274 8.1499H10.6991V11.8482H16.3193C16.2061 12.7673 15.5942 14.1514 14.2344 15.0815L14.2153 15.2053L17.2428 17.4971L17.4525 17.5176C19.3788 15.7791 20.4893 13.2213 20.4893 10.1873Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M10.6991 19.9312C13.4526 19.9312 15.7641 19.0453 17.4525 17.5173L14.2344 15.0812C13.3733 15.6681 12.2175 16.0777 10.6991 16.0777C8.00229 16.0777 5.71339 14.3393 4.89746 11.9365L4.77786 11.9464L1.62991 14.3271L1.58875 14.439C3.26576 17.6944 6.71047 19.9312 10.6991 19.9312Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M4.89735 11.9368C4.68206 11.3168 4.55747 10.6523 4.55747 9.96583C4.55747 9.27927 4.68206 8.61492 4.88603 7.99484L4.88032 7.86278L1.69292 5.44385L1.58863 5.49232C0.897454 6.84324 0.500854 8.36026 0.500854 9.96583C0.500854 11.5714 0.897454 13.0884 1.58863 14.4393L4.89735 11.9368Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M10.6992 3.85335C12.6141 3.85335 13.9059 4.66167 14.6424 5.33716L17.5206 2.59106C15.7529 0.985494 13.4526 0 10.6992 0C6.71049 0 3.26576 2.23671 1.58875 5.49212L4.88615 7.99464C5.71341 5.59182 8.00232 3.85335 10.6992 3.85335Z"
                  fill="#EB4335"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_12302_63595">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.5)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
            <span className="ml-2">Continue with Google</span>
          </button>
          <p className="my-4 text-center text-gray-600">or</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="email"
                  className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                >
                  Email{" "}
                </label>
                <input
                  type="email"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="email"
                  placeholder="you@youremail.com"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {errors.email && errors.email.message}
              </div>
            </div>
            <div className="" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="password"
                  className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                >
                  Password{" "}
                </label>
                <input
                  type="password"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="password"
                  placeholder="Your password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  type="button"
                  aria-label="view-password"
                  className="text-light absolute right-0 cursor-pointer px-2 hover:text-primary"
                  //   onClick={(e) => { togglePassword(e); }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-eye-off"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    title="show"
                  >
                    <desc>
                      Download more icon variants from
                      https://tabler-icons.io/i/eye-off
                    </desc>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="3" y1="3" x2="21" y2="21"></line>
                    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83"></path>
                    <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"></path>
                  </svg>
                </button>
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {errors.password && errors.password.message}
              </div>
            </div>
            {isLoading && (
              <div>
                <Spinner />
              </div>
            )}
            {error && (
              <div className="mt-4 flex items-center justify-center">
                <div className="text-sm font-medium text-red-300">{error}</div>
              </div>
            )}
            <div className="mt-4 flex items-center justify-between">
              <Link
                className="text-xs  text-gray-700 hover:underline"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
              <div>
                <PrimaryButton type="submit">Sign In</PrimaryButton>
              </div>
            </div>
          </form>
        </div>
        <div className="flex h-full w-full flex-1 items-center justify-center text-center sm:items-end">
          <p className="text-center text-sm text-gray-600">
            Not a member?
            <Link className="ml-1 font-medium" to="/sign-up">
              Register an account.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
