import React, { useEffect, useState } from "react";
import axios from "axios";
import { PrimaryButton } from "@/widgets/buttons";
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import courseStore from "@/store/courseStore";

export function AddCourse() {
    const fetchCourses = courseStore((state) => state.fetchCourses);
    const courses = courseStore((state) => state.courses);
    const [courseNames, setCourseNames] = useState([]);
    useEffect(() => {
        fetchCourses();
        if (courses) {
            const names = courses.map((course) => course.name);
            setCourseNames(names);
        }
    }, []);
    const [categories] = useState([
        "Algorithms and Data Structures",
        "Artificial Intelligence",
        "Computer Architecture",
        "Computer Graphics",
        "Computer Networks",
        "Computer Security and Cryptography",
        "Computer Systems and Operating Systems",
        "Database Systems",
        "Human-Computer Interaction",
        "Machine Learning",
        "Programming Languages",
        "Software Engineering",
        "Web Development",
    ]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState();
    const [duration, setDuration] = useState("");
    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const instructorId = localStorage.getItem("id");
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Input validation
        if (!name) {
            return toast.error("Name field is required");
        }
        if (courseNames.includes(name)) {
            return toast.error("A course with this name already exists");
        }
        if (!category) {
            return toast.error("Category field is required");
        }
        if (!duration || isNaN(duration)) {
            return toast.error("Duration field is required and must be a number");
        }
        if (!startdate || !moment(startdate).isValid()) {
            return toast.error(
                "Start date field is required and must be a valid date"
            );
        }
        if (!enddate || !moment(enddate).isValid()) {
            return toast.error("End date field is required and must be a valid date");
        }
        if (!price || isNaN(price)) {
            return toast.error("Price field is required and must be a number");
        }
        // Check if start date is before end date
        if (moment(startdate).isAfter(enddate)) {
            return toast.error("Start date must be before end date");
        }

        /*  // New validation condition
         const startDateMoment = moment(startdate);
         const endDateMoment = moment(enddate);
         const durationMonths = endDateMoment.diff(startDateMoment, 'months');
         console.log(durationMonths) */

        /*  if (duration !== durationMonths) {
           return toast.error("Duration must be equal to the difference between end date and start date in months");
         } */
        try {
            const form = new FormData();
            const startdateFormatted = moment(startdate).format("YYYY-MM-DD");
            const enddateFormatted = moment(enddate).format("YYYY-MM-DD");
            form.append("name", name);
            form.append("description", description);
            form.append("category", category);
            form.append("duration", duration);
            form.append("startdate", startdateFormatted);
            form.append("enddate", enddateFormatted);
            form.append("price", price);
            form.append("file", file);
            const url = `https://expertise-shaper-37ut.onrender.com/api/course/addCourse/${instructorId}`;
            console.log(url);
            const response = await axios.post(url, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Course added successfully");
            console.log(response.data);
            // Handle successful response
        } catch (error) {
            toast.error(error);
            console.error(error);
            // Handle error response
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };
    return (
        <div style={{ overflow: "scroll", height: "90%" }}>

            <form onSubmit={handleSubmit} >
                <div className="mb-4" role="none">
                    <div className="relative flex flex-col justify-center rounded border border-gray-400 bg-white transition duration-150 ease-in-out focus-within:border-primary">
                        <label
                            htmlFor="Name"
                            className="select-none self-start px-2 pt-1 text-xs text-gray-600 placeholder-gray-400 "
                        >
                            Name{" "}
                        </label>
                        <TextField
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
                        <TextField
                            type="text"
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                            id="description"
                            placeholder="Enter course description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
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
                        <TextField
                            type="text"
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                            id="duration"
                            placeholder="Enter course duration (number of months)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
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
                        <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(option) => option}
                            value={category}
                            onChange={(event, newValue) => {
                                setCategory(newValue);
                            }}
                            style={{
                                margin: "25px 0 ",
                            }}
                            sx={{
                                width: "70%",
                                height: "50px",
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Category" />
                            )}
                        />
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
                        <TextField
                            type="date"
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                            id="startdate"
                            placeholder="Enter course category"
                            value={startdate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
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
                        <TextField
                            type="date"
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                            id="enddate"
                            placeholder="Enter course category"
                            value={enddate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
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
                        <TextField
                            type="text"
                            className="w-full rounded-md bg-white px-2 pb-1 text-sm text-primary outline-none "
                            id="price"
                            placeholder="Enter course price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <br />
                    <TextField
                        type="file"
                        name="file"
                        accept="application/pdf,.doc,.docx,image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
                <div className="mt-4 flex items-center">
                    <div>
                        <PrimaryButton type="submit">Save</PrimaryButton>
                    </div>
                </div>
            </form>


        </div>
    );
}

export default AddCourse;
