import { useForm } from "react-hook-form";
import { SecondaryButton } from "@/widgets/buttons";
import { useState } from "react";
import { toast } from "react-toastify";
import useUserStore from "@/store/userStore";
import { Spinner } from "@/widgets";

export function EditAccount({ user }) {
  const updateUser = useUserStore((state) => state.updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUser(user._id, name, email, password).then(() => {
        toast.success("Account updated");
        setLoading(false);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4" role="none">
          <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
            <label
              htmlFor="name"
              className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
            >
              Name{" "}
            </label>
            <input
              type="name"
              className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
              id="name"
              placeholder="Enter your name"
              autoComplete="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mt-1 text-xs font-medium italic text-red-300">
            {errors.name && errors.name.message}
          </div>
        </div>
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
              placeholder="Enter a  password"
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
        <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
        <div className="mt-4 flex items-center">
          <div>
            <SecondaryButton type="submit">Save</SecondaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditAccount;
