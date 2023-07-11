import { AppLayout } from "@/widgets/layout";
import { useEffect, useState } from "react";
import courseStore from "@/store/courseStore";
import { SecondaryButton } from "@/widgets/buttons";

export function AddCourses() {
  const addCourse = courseStore((state) => state.addCourse);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [price, setPrice] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      name,
      description,
      file,
      category,
      duration,
      startdate,
      enddate,
      price,
    };
    addCourse(newCourse);
    setName("");
    setDescription("");
    setFile("");
    setCategory("");
    setDuration("");
    setStartdate("");
    setEnddate("");
    setPrice("");
  };
  return (
    <AppLayout>
      <AppLayout.Header>Add Course</AppLayout.Header>
      <AppLayout.Content>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="Name"
                  className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                >
                  Name{" "}
                </label>
                <input
                  type="name"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="name"
                  placeholder="Enter course name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {/* {errors.name && errors.name.message} */}
              </div>
            </div>
            <div className="mb-4" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="Description"
                  className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                >
                  Description{" "}
                </label>
                <input
                  type="text"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="description"
                  placeholder="Enter course description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {/* {errors.email && errors.email.message} */}
              </div>
            </div>
            <div className="" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="Duration"
                  className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                >
                  Duration{" "}
                </label>
                <input
                  type="text"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="duration"
                  placeholder="Enter course duration (number of months)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {/* {errors.password && errors.password.message} */}
              </div>
            </div>
            <div className="" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="Category"
                  className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                >
                  Category{" "}
                </label>
                <input
                  type="text"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="category"
                  placeholder="Enter course category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {/* {errors.password && errors.password.message} */}
              </div>
            </div>
            <div className="" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="Start Date"
                  className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                >
                  Start Date{" "}
                </label>
                <input
                  type="date"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="startdate"
                  placeholder="Enter course category"
                  value={startdate}
                  onChange={(e) => setStartdate(e.target.value)}
                />
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {/* {errors.password && errors.password.message} */}
              </div>
            </div>
            <div className="" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="End Date"
                  className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                >
                  End Date{" "}
                </label>
                <input
                  type="date"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="enddate"
                  placeholder="Enter course category"
                  value={enddate}
                  onChange={(e) => setEnddate(e.target.value)}
                />
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {/* {errors.password && errors.password.message} */}
              </div>
            </div>
            <div className="" role="none">
              <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                <label
                  htmlFor="Price"
                  className="select-none self-start px-2 pt-1   text-xs text-gray-600 placeholder-gray-400 "
                >
                  Price{" "}
                </label>
                <input
                  type="text"
                  className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                  id="price"
                  placeholder="Enter course price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mt-1 text-xs font-medium italic text-red-300">
                {/* {errors.password && errors.password.message} */}
              </div>
            </div>
            {/* {isLoading && (
          <div>
            <Spinner />
          </div>
        )} */}
            <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
            <div className="mt-4 flex items-center">
              <div>
                <SecondaryButton type="submit">Save</SecondaryButton>
              </div>
            </div>
          </form>
        </div>
      </AppLayout.Content>{" "}
    </AppLayout>
  );
}

export default AddCourses;
