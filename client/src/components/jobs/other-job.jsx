import { LinkedIn } from "@mui/icons-material";

export function OtherJob({ job }) {
    return (
        <a
            className="w-full"
            href={job.link}
            target="_blank"
        >
            <div className="flex items-start p-4 sm:p-6 ">
                <div className="mr-2">
                    <div className="relative h-10 w-10">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                            <img
                                className="border-primaryBorder flex h-10 w-10 items-center justify-center rounded-full rounded-full border bg-white bg-cover bg-center bg-no-repeat object-cover transition-opacity hover:opacity-90"
                                alt=""
                                width="40"
                                height="40"
                                src={job.logo || "https://peerlist-media.s3.amazonaws.com/company/foldhealth/logo.png"}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="mb-0.5 flex items-center justify-between">
                        <p className="text-base font-medium  ">
                            <span>{job.title} </span>
                            <span className="text-sm font-normal">at {job.company || "X Company"}</span>
                        </p>
                    </div>
                    <div className="mb-3 flex flex-wrap items-center">
                        <p className=" mb-1 mr-1 text-xs font-normal capitalize sm:mb-0">
                            ({job.location})
                        </p>

                        <p className=" mb-1 text-xs font-normal sm:mb-0"> • {job.posted}</p>
                    </div>
                    <div className=""><LinkedIn scale={10} /></div>
                </div>
            </div>
        </a>
    );
}

export default OtherJob;