import { PrimaryButton } from "@/widgets/buttons";
import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "@/widgets";

export function ForgotPassword() {
  const navigate = useNavigate();
  const forgot = useAuthStore((state) => state.forgot);
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    setError(null);
    try {
      setLoading(true);
      await forgot(email).then(() => navigate("/forgot-sent"));
    } catch (error) {
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
            Forgot your password?
          </h1>
          <p className="mb-8 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
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
                  autoComplete="username"
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
              <div className="mt-1">
                {errors.email && (
                  <p className="text-xs italic text-red-500">
                    {errors.email.message}
                  </p>
                )}
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
                <PrimaryButton type="submit">Send reset email.</PrimaryButton>
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

export default ForgotPassword;
