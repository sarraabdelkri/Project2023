import { PrimaryButton, SecondaryButton } from "@/widgets/buttons";
import { Navbar } from "@/widgets/layout";
import { Link } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import ReactGA from "react-ga";

export function Home() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  return (
    <>
      <Navbar />
      <section id="For-Individuals" className="bg-white">
        <div className="xl:max-w-screen mx-auto mt-2 flex w-full flex-col items-center justify-between py-10 px-4 text-primary md:w-5/6 md:px-0 lg:flex-row lg:py-24">
          <div className="lg:w-55p w-full">
            <div className="mb-3">
              <h2 className="capitlize mb-10 text-base font-medium tracking-wider text-btn-primary">
                For Everyone.
              </h2>
              <h3 className="text-gray-gray9 mb-2 text-3xl font-bold tracking-tight text-[#3D4F90] lg:text-5xl lg:leading-[58px]">
                Get to learn and get a job <div>ASAP.</div>
              </h3>
            </div>
            <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border-primaryBorder flex rounded-lg border bg-white p-4">
                <div className="h-12 w-12 text-green-900">
                  <CheckIcon />
                </div>
                <div className="ml-2">
                  <h4 className="text-base font-semibold tracking-normal text-[#3D4F90]">
                    Proof of work
                  </h4>
                  <p className="text-gray text-sm font-normal tracking-normal text-[#3D4F90]">
                    Showcase your proof-of-work from different platforms on
                    Peerlist profile.{" "}
                  </p>
                </div>
              </div>
              <div className="border-primaryBorder flex rounded-lg border bg-white p-4">
                <div className="h-12 w-12 text-green-900">
                  <CheckIcon />
                </div>
                <div className="ml-2">
                  <h4 className="text-base font-semibold tracking-normal text-[#3D4F90]">
                    Always up-to-date
                  </h4>
                  <p className="text-gray text-sm font-normal tracking-normal text-[#3D4F90]">
                    With integrations, your portfolio is always up-to-date
                  </p>
                </div>
              </div>
              <div className="border-primaryBorder flex rounded-lg border bg-white p-4">
                <div className="h-12 w-12 text-green-900">
                  <CheckIcon />
                </div>
                <div className="ml-2">
                  <h4 className="text-base font-semibold tracking-normal text-[#3D4F90]">
                    Verified Work Experience
                  </h4>
                  <p className="text-gray text-sm font-normal tracking-normal text-[#3D4F90]">
                    Improved credibility of your profile with verified work
                    experience!
                  </p>
                </div>
              </div>
              <div className="border-primaryBorder flex rounded-lg border bg-white p-4">
                <div className="h-12 w-12 text-green-900">
                  <CheckIcon />
                </div>
                <div className="ml-2">
                  <h4 className="text-base font-semibold tracking-normal text-[#3D4F90] ">
                    Profile Analytics
                  </h4>
                  <p className="text-gray text-sm font-normal tracking-normal text-[#3D4F90]">
                    Know who viewed your profile and where people are clicking.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center lg:flex-row">
              <div className="flex justify-center">
                <Link to="/sign-up">
                  <PrimaryButton>
                    Start Now
                    <span className="ml-1 inline-block transform transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
          <img
            src="/img/profile-section.png"
            alt="For Individuals"
            className="mt-10 w-screen lg:mt-0 lg:w-[484px]"
          ></img>
        </div>
      </section>
    </>
  );
}

export default Home;
