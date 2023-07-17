import { PrimaryButton } from "@/widgets/buttons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify"
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";

import { Spinner } from "@/widgets";
import { useForm } from "react-hook-form";

export function ForgotReset() {
  const navigate = useNavigate();
  const reset = useAuthStore((state) => state.resetPassword);
  const [token, setToken] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { search } = useLocation();
  const resetToken = new URLSearchParams(search).get("resetToken");
  useEffect(() => {
    setToken(resetToken);
  }, [resetToken]);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    if (pass !== confirmPass) {
      return toast.error("Confirm your password again!!")
    }
    try {
      await reset(token, pass).then(() => navigate("/forgot-done"));
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
          <h1 className="mb-8 text-center	text-2xl font-medium text-primary">
            Reset your password.
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Type in a new password"
                  autoComplete="new-password"
                  value={pass}
                  {...register("pass", {
                    required: "Please enter a password",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  onChange={(e) => {
                    setPass(e.target.value);
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
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="3" y1="3" x2="21" y2="21"></line>
                    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83"></path>
                    <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"></path>
                  </svg>
                </button>
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {errors.pass && errors.pass.message}
              </div>
            </div>
            <div className="mt-5" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="password"
                  className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                >
                  Confirm Password{" "}
                </label>
                <input
                  type="password"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="password"
                  placeholder="Confirm the new password"
                  autoComplete="new-password"
                  value={confirmPass}
                  {...register("confirmPass", {
                    required: "Please confirm your password",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
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
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="3" y1="3" x2="21" y2="21"></line>
                    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83"></path>
                    <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341"></path>
                  </svg>
                </button>
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {errors.confirmPass && errors.confirmPass.message}
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
            <div className="mt-4 flex items-center justify-center">
              <div>
                <PrimaryButton type="submit">Reset password</PrimaryButton>
              </div>
            </div>
          </form>
        </div>
        <div className="flex h-full w-full flex-1 items-center justify-center text-center sm:items-end">
          <p className="text-center text-sm text-gray-600">
            Not a member?
            <Link className="ml-1 font-medium" to="/register">
              Register an account.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotReset;
