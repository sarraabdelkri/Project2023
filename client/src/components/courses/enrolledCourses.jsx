import { AppLayout } from "@/widgets/layout";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import courseStore from "@/store/courseStore";
import courseicon from "../../../public/img/course.png";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BeatLoader } from "react-spinners";

export function EnrolledCourses() {
  const [enrolledCourses, SetEnrolledCourses] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const getEnrolledCourses = courseStore((state) => state.getEnrolledCourses);
  const getCourseById = courseStore((state) => state.getCourseById);
  const userid = user ? user._id : null;
  const navigate = useNavigate()
  const fetchCourseById = async (id) => {
    const course = await getCourseById(id);
    return course;
  };
  const getCoursesDetails = async () => {
    const response = await getEnrolledCourses(userid);
    if (response) {
      const courses = await Promise.all(
        response.map(async (course) => {
          const courseDetails = await fetchCourseById(course.course);
          return {
            ...courseDetails,
            progress: course.progress,
            completed: course.completed,
            enrolledCourseId: course._id,
          };
        })
      );
      SetEnrolledCourses(courses);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
    getCoursesDetails();
  }, []);
  if (!enrolledCourses) {
    return (
      <div className="flex h-screen items-center justify-center">
        <BeatLoader color="#1E9645" size={20} />
      </div>
    );
  }
  return (
    <>
      <AppLayout>
        <AppLayout.Header>My Enrolled Courses</AppLayout.Header>
        <AppLayout.Content>
          <div className="h-full overflow-scroll px-6 pb-10 pt-4">
            <div className="mb-32 w-full lg:mb-16">
              {enrolledCourses && enrolledCourses.length > 0 ? (
                enrolledCourses.map((course) => {
                  return (
                    <div className="mb-32 w-full lg:mb-5" key={course._id}>
                      <ul>
                        <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300">
                          <a className="w-full" href="">
                            <div className="flex items-start p-2 sm:p-5 ">
                              <div className="mr-2">
                                <img
                                  alt=" "
                                  loading="lazy"
                                  width="30"
                                  height="30"
                                  decoding="async"
                                  data-nimg="1"
                                  className="mr-1  object-cover"
                                  src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${course.name}.svg`}
                                />
                              </div>
                              <div className="w-full">
                                <div className="mb-0.5 flex items-center justify-between">
                                  <p className="text-base font-medium  ">
                                    <Link
                                      to={`/courses/${course._id}`}
                                      onClick={() =>
                                        handleCourseClick(course._id)
                                      }
                                    >
                                      {" "}
                                      <span>{course.name} </span>
                                    </Link>

                                    <span className="text-sm font-normal">
                                      at Tunisia
                                    </span>
                                  </p>
                                  <p>
                                    {" "}
                                    <span className="text-sm font-normal">
                                      <small style={{ color: "#2E5C35" }}>
                                        {" "}
                                        <b>Progress : {course.progress}</b>{" "}
                                      </small>
                                    </span>
                                  </p>
                                </div>
                                <div className="mb-3 flex flex-wrap items-center">
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
                                    {format(
                                      new Date(course.enddate),
                                      "yyyy-MM-dd"
                                    )}{" "}
                                    ]
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
                                        src={courseicon}
                                      />
                                      <span className="capitalize leading-5 lg:inline">
                                        {course.category}
                                      </span>
                                    </span>
                                    {course.progress === 100 && (
                                      <div className="absolute bottom-0 right-0 mb-3 mr-2">
                                        <CheckCircleIcon
                                          style={{ color: "#2E5C35" }}
                                          className="h-6 w-6"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  );
                })) : (
                <div className="flex justify-center items-center h-full mt-6">
                  <div className="flex flex-col items-center">
                    <p style={{ color: "#D2D2D2" }}>You haven't enrolled any course yet!</p>
                    <XMarkIcon style={{ color: "#D2D2D2" }} className="h-10 w-10" />
                  </div>
                </div>
              )}



            </div>
          </div>
        </AppLayout.Content>
      </AppLayout>
    </>
  );
}

export default EnrolledCourses;
