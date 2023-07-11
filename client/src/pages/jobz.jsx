import { PrimaryButton, SecondaryButton } from "@/widgets/buttons";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

export function Jobz() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full lg:w-[1200px]">
      <div className="fixed hidden h-screen w-[212px] flex-shrink-0 flex-col justify-between border-r border-gray-300 pb-6 lg:flex">
        <div className="relative my-3">
          <Link to="/">
            <img
              alt="EShaper"
              loading="lazy"
              decoding="async"
              data-nimg="1"
              className="h-8 w-[120px]"
              src="/img/logo.png"
            />
          </Link>
        </div>
      </div>
      <div className="border-r border-gray-300 pl-[212px]">
        <div className="w-348 top-0 float-right flex h-14 ">
          <div
            aria-label="App Navbar"
            className="w-348 fixed  top-0 z-10 -mt-px flex-shrink-0 border-l border-b border-gray-300 bg-white px-4 py-3 lg:px-6"
          >
            <div className="box-border flex h-full items-center justify-end gap-4">
              {user ? (
                <>
                  <div className="cursor-pointer">{user.name}</div>
                  <div onClick={() => handleLogout()}>
                    <SecondaryButton>Logout</SecondaryButton>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/sign-in">
                    <SecondaryButton>Sign In</SecondaryButton>
                  </Link>
                  <Link to="/sign-up">
                    <PrimaryButton>Join Us</PrimaryButton>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="h-full w-full pt-14  lg:w-[640px]">
          <div
            aria-label="Center Top"
            className="fixed top-0 left-12 right-12 z-40 box-border flex h-14 items-center justify-between border-b border-gray-300 bg-white  py-4 px-2 sm:px-6 lg:left-auto lg:right-auto lg:z-50  lg:w-[640px] lg:max-w-[640px] lg:border-r"
          >
            <h1 className="text-base font-medium text-primary ">All Jobs</h1>
            {/* <div className="flex items-center">
              <button
                className="leading-120 border-gray-gray3 hover:bg-gray-gray1 flex flex h-8 w-8 select-none items-center justify-center rounded-full border bg-white text-center text-sm font-medium tracking-wide text-primary transition-all duration-75 ease-in disabled:cursor-not-allowed disabled:opacity-50 lg:hidden "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-filter"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <desc>
                    Download more icon variants from
                    https://tabler-icons.io/i/filter
                  </desc>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5"></path>
                </svg>
              </button>
            </div> */}
          </div>
          <div className="mb-32 w-full lg:mb-16">
            <ul>
              <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300">
                <a
                  className="w-full"
                  href="/company/foldhealth/careers/ux-designer/jobhq7bngj6q9g7e8cooknng6bqnkn"
                >
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
                          <span>UX Designer </span>
                          <span className="text-sm font-normal">
                            at foldhealth
                          </span>
                        </p>
                      </div>
                      <div className="mb-3 flex flex-wrap items-center">
                        <p className="text-light text-gray mr-1 mb-1 text-xs font-normal capitalize sm:mb-0">
                          in-office (Pune, India)
                        </p>
                        <p className="text-light text-gray mr-1 mb-1 text-xs font-normal sm:mb-0">
                          {" "}
                          • Full-time{" "}
                        </p>
                        <p className="text-light text-gray mr-1 mb-1 text-xs font-normal sm:mb-0">
                          {" "}
                          • 2 - 5 years
                        </p>
                        <p className="text-light text-gray mb-1 text-xs font-normal sm:mb-0">
                          {" "}
                          • 8 days ago
                        </p>
                      </div>
                      <div className="mt-2 hidden lg:block">
                        <div className="mt-1 flex flex-wrap items-start">
                          <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white py-0.5 px-3 text-xs capitalize ">
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
                              Figma
                            </span>
                          </span>
                          <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white py-0.5 px-3 text-xs capitalize ">
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
                              Sketch
                            </span>
                          </span>
                          <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white py-0.5 px-3 text-xs capitalize ">
                            <img
                              alt=" "
                              loading="lazy"
                              width="16"
                              height="16"
                              decoding="async"
                              data-nimg="1"
                              className="h-0 w-0"
                              src="https://d26c7l40gvbbg2.cloudfront.net/tool_icons/design_research.svg"
                            />
                            <span className="capitalize leading-5 lg:inline" />
                            Design Research
                          </span>
                        </div>
                        <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white py-0.5 px-3 text-xs capitalize ">
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
                            Design Thinking
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobz;
