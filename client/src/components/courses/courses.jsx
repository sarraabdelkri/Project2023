import { AppLayout } from "@/widgets/layout";
import { useEffect, useState } from "react";
import courseStore from "@/store/courseStore";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useStore } from "zustand";
import Slider from "@mui/material/Slider";
import { Card, CardContent, Typography, Icon } from "@mui/material";
import PriceRangeSlider from "../courses/priceSlider";
import { blue } from "@mui/material/colors";

export function Courses() {
  const fetchCourses = courseStore((state) => state.fetchCourses);
  const courses = courseStore((state) => state.courses);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCourses = courses.filter((course) => {
    if (selectedCategory && selectedCategory !== "All") {
      return (
        course.category === selectedCategory &&
        course.price >= priceRange[0] &&
        course.price <= priceRange[1] &&
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return (
      course.price >= priceRange[0] &&
      course.price <= priceRange[1] &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleCourseClick = (id) => {
    setSelectedCourseId(id);
  };

  useEffect(() => {
    fetchCourses();
    console.log(selectedCategory);
  }, []);
  return (
    <>
      <AppLayout>
        <AppLayout.Header>Courses</AppLayout.Header>
        <AppLayout.Content>
          <div className="h-full overflow-scroll px-6 pb-10 pt-4">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 16,
                color: blue,
              }}
            >
              <input
                type="text"
                placeholder="Search courses"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <select value={selectedCategory} onChange={handleCategoryChange}>
                {" "}
                <option value="All">All</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Computer Graphics">Computer Graphics</option>
                <option value="Database Systems">Database Systems</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Computer Security">Computer Security</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
              </select>
              <PriceRangeSlider
                priceRange={priceRange}
                handlePriceRangeChange={handlePriceRangeChange}
              />
            </div>
            {filteredCourses.map((course) => {
              return (
                <div className="mb-32 w-full lg:mb-16" key={course._id}>
                  <ul>
                    <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300">
                      <a className="w-full" href="">
                        <div className="flex items-start p-4 sm:p-6 ">
                          <div className="mr-2">
                            <div className="relative h-10 w-10">
                              <div className="h-10 w-10 overflow-hidden rounded-full">
                                <img
                                  className="border-primaryBorder flex h-10 w-10 items-center justify-center rounded-full rounded-full border bg-white bg-cover bg-center bg-no-repeat object-cover transition-opacity hover:opacity-90"
                                  src="https://peerlist-media.s3.amazonaws.com/company/foldhealth/logo.png"
                                  alt=""
                                  width="40"
                                  height="40"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="mb-0.5 flex items-center justify-between">
                              <p className="text-base font-medium  ">
                                <Link
                                  to={`/courses/${course._id}`}
                                  onClick={() => handleCourseClick(course._id)}
                                >
                                  {" "}
                                  <span>{course.name} </span>
                                </Link>
                                <span className="text-sm font-normal">
                                  at Tunisia
                                </span>
                              </p>
                            </div>
                            <div className="mb-3 flex flex-wrap items-center">
                              <p className=" mb-1 mr-1 text-xs font-normal capitalize sm:mb-0">
                                {course.description}
                              </p>
                              <p className="mb-1 mr-1 text-xs font-normal sm:mb-0">
                                {" "}
                                • {course.enrollment} Participants{" "}
                              </p>
                              <p className=" text-gray mb-1 mr-1 text-xs font-normal sm:mb-0">
                                {" "}
                                • [{" "}
                                {format(
                                  new Date(course.startdate),
                                  "yyyy-MM-dd"
                                )}{" "}
                                -{" "}
                                {format(new Date(course.enddate), "yyyy-MM-dd")}
                              </p>
                              <p className=" mb-1 text-xs font-normal sm:mb-0">
                                {" "}
                                ] • 8 days ago
                              </p>
                            </div>
                            <div className="mt-2 hidden lg:block">
                              <div className="mt-1 flex flex-wrap items-start">
                                <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                                  <img
                                    alt=" "
                                    loading="lazy"
                                    width="16"
                                    height="16"
                                    decoding="async"
                                    data-nimg="1"
                                    className="mr-1 h-4 w-4 object-cover"
                                    src="https://d26c7l40gvbbg2.cloudfront.net/tool_icons/figma.svg"
                                  />

                                  <span className="capitalize leading-5 lg:inline">
                                    {course.category}
                                  </span>
                                </span>
                                <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                                  <img
                                    alt=" "
                                    loading="lazy"
                                    width="16"
                                    height="16"
                                    decoding="async"
                                    data-nimg="1"
                                    className="mr-1 h-4 w-4 object-cover"
                                    src="https://d26c7l40gvbbg2.cloudfront.net/tool_icons/sketch.svg"
                                  />
                                  <span className="capitalize leading-5 lg:inline">
                                    {course.duration} Months{" "}
                                  </span>
                                </span>
                                <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                                  <img
                                    alt=" "
                                    loading="lazy"
                                    width="16"
                                    height="16"
                                    decoding="async"
                                    data-nimg="1"
                                    className="mr-1 h-4 w-4 object-cover"
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik00LjgyIDE5LjQwN2MtMi45NjYtMS44NTctNC45NC01LjE1My00Ljk0LTguOTA3IDAtNS43OTUgNC43MDUtMTAuNSAxMC41LTEwLjUgMy42MDUgMCA2Ljc4OSAxLjgyMSA4LjY4IDQuNTkzIDIuOTY2IDEuODU3IDQuOTQgNS4xNTMgNC45NCA4LjkwNyAwIDUuNzk1LTQuNzA1IDEwLjUtMTAuNSAxMC41LTMuNTk5IDAtNi43NzgtMS44MTUtOC42Ny00LjU3OWwtLjAxLS4wMTR6bTguNjgtMTUuNDA3YzUuMjQzIDAgOS41IDQuMjU3IDkuNSA5LjVzLTQuMjU3IDkuNS05LjUgOS41LTkuNS00LjI1Ny05LjUtOS41IDQuMjU3LTkuNSA5LjUtOS41em0uNSAxNWgtMS4wMjF2LS44NzFjLTIuMzQzLS4zMDItMi41OTktMi4xNzktMi41OTktMi43NDRoMS4wOTFjLjAyNS40MDUuMTU3IDEuNzc0IDIuMTgyIDEuNzc0LjU5OSAwIDEuMDg4LS4xNDEgMS40NTMtLjQxOS4zNjEtLjI3Ni41MzYtLjYxMi41MzYtMS4wMjkgMC0uNzkzLS41MTMtMS4zNjctMi4wNy0xLjcxOC0yLjM2OC0uNTM2LTIuOTIzLTEuMzk4LTIuOTIzLTIuNTMzIDAtMS41MDkgMS4yMjMtMi4yMTYgMi4zMy0yLjQwNnYtMS4wNTRoMS4wMjF2MS4wMTVjMi40OTEuMTk1IDIuNjk1IDIuMjE1IDIuNjk1IDIuNzcxaC0xLjA5OGMwLTEuMTYxLS45MTgtMS43NjYtMS45OTYtMS43NjYtMS4wNzcgMC0xLjg1NC41MzItMS44NTQgMS40MDggMCAuNzgxLjQzOSAxLjE2NSAxLjk5NCAxLjU1NCAxLjg3OS40NzMgMi45OTkgMS4xMDEgMi45OTkgMi42ODEgMCAxLjc0NC0xLjUwOSAyLjM5My0yLjc0IDIuNDkzdi44NDR6bTIuODUtMTUuNDUzYy0xLjY5Ni0xLjU4LTMuOTcxLTIuNTQ3LTYuNDctMi41NDctNS4yNDMgMC05LjUgNC4yNTctOS41IDkuNSAwIDIuNjMzIDEuMDczIDUuMDE3IDIuODA2IDYuNzM5bC0uMDA0LS4wMWMtLjQ0LTEuMTU5LS42ODItMi40MTYtLjY4Mi0zLjcyOSAwLTUuNzk1IDQuNzA1LTEwLjUgMTAuNS0xMC41IDEuMTcxIDAgMi4yOTguMTkyIDMuMzUuNTQ3eiIvPjwvc3ZnPg=="
                                  />
                                  <span className="capitalize leading-5 lg:inline" />
                                  {course.price} Dt
                                </span>
                              </div>
                              <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                                <img
                                  alt=" "
                                  loading="lazy"
                                  width="16"
                                  height="16"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-0 w-0"
                                  src="https://d26c7l40gvbbg2.cloudfront.net/tool_icons/design_thinking.svg"
                                />
                                <span className="capitalize leading-5 lg:inline">
                                  {course.category}{" "}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              );
            })}{" "}
          </div>
        </AppLayout.Content>
      </AppLayout>
    </>
  );
}

export default Courses;
