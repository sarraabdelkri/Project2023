import useUserStore from "@/store/userStore";
import React, { useEffect, useState } from "react";
import notificationStore from "@/store/notificationStore";
import { AppLayout } from "@/widgets/layout";
import { format } from "date-fns";
import courseicon from "../../../public/img/course.png";
import { Link, useNavigate } from "react-router-dom";
import courseStore from "@/store/courseStore";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function Wishlist() {
  const getUserWishlist = useUserStore((state) => state.getUserWishlist);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;
  const [favorites, setFavorites] = useState();
  const navigate = useNavigate()
  const getList = async () => {
    const response = await getUserWishlist(userId);
    setFavorites(response.data);
  };

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
    getList();
  }, []);

  return (
    <>
      <AppLayout>
        <AppLayout.Header>My Wishlist</AppLayout.Header>
        <AppLayout.Content>
          <div className="h-full overflow-scroll px-6 pb-10 pt-4">
            <div className="mb-32 w-full lg:mb-16">
              {favorites && favorites.length > 0 ? (
                favorites.map((course) => {
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
                                  <p className="mb-1 mr-1 text-xs font-normal sm:mb-0">
                                    {" "}
                                    • {course.enrollment} Participants{" "}
                                  </p>
                                  <p className=" text-gray mb-1 mr-1 text-xs font-normal sm:mb-0">
                                    {" "}
                                    • [{" "}
                                    {format(new Date(course.startdate), "yyyy-MM-dd")}{" "}
                                    -{" "}
                                    {format(new Date(course.enddate), "yyyy-MM-dd")}{" "}
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
                })
              ) : (
                <div className="flex justify-center items-center h-full mt-6">
                  <div className="flex flex-col items-center">
                    <p style={{ color: "#D2D2D2" }}>No favorites found</p>
                    <HeartIcon style={{ color: "#D2D2D2" }} className="h-10 w-10" />
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
