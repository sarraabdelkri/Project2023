import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton } from "@/widgets/buttons";
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
      setName(user.name);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4" role="none">
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
                className="w-full rounded-md bg-white px-2 pb-1 text-sm  outline-none "
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
                className="w-full rounded-md bg-white px-2 pb-1 text-sm  outline-none "
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
                htmlFor="name"
                className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
              >
                Password{" "}
              </label>
              <input
                type="password"
                className="w-full rounded-md bg-white px-2 pb-1 text-sm  outline-none "
                id="password"
                placeholder="Confirm Password"
                autoComplete="password"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 8,
                    message: "password",
                  },
                })}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-1 text-xs font-medium italic text-red-300">
            {errors.password && errors.password.message}
          </div>
        </div>
        {
          isLoading && (
            <div>
              <Spinner />
            </div>
          )
        }
        <div className="mt-2 h-[1px] w-full "></div>
        <div className="mt-4 flex items-center">
          <div className="ml-auto">
            <PrimaryButton type="submit">Save</PrimaryButton>
          </div>
        </div>
      </form >
    </div >
  );
}

export default EditAccount;