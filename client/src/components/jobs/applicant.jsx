import useApplicationStore from "@/store/applicationStore";
import {
    UserCircleIcon,
    NoSymbolIcon,
    CheckIcon,
    CheckBadgeIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function applicant({ applicant }) {

    const date = new Date(applicant.appliedOn);
    const formattedDate = `${date.getDate()} ${date.toLocaleString("en-US", {
        month: "short",
    })} ${date.getFullYear()}`;


    const handleDelete = () => {
        useApplicationStore.getState().deleteApplication(applicant._id);
        toast.success("Application deleted successfully");
        navigate(-1);
    };
    const navigate = useNavigate();
    const handleAccept = () => {
        navigate('/contracts');
        console.log('Accepted');
    };


    return (
        <div className=" rounded-md bg-gray-100">
            <div className="flex justify-between px-5 py-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <UserCircleIcon className="h-5 w-5 " />
                    </div>
                    <div className="ml-3">
                        <div className="flex gap-2">
                            <h3 className="text-sm font-medium text-gray-900">{applicant.student.name}</h3>
                            {applicant.student.verified && (
                                <CheckBadgeIcon
                                    className="h-5 w-5 text-green-500"
                                    title="Verified"
                                />
                            )}
                        </div>
                        <div className="mt-2 text-sm text-gray-800">
                            <p>{applicant.student.email}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-800">
                            <p>{applicant.student.skills}</p>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                            <p>Applied on: {formattedDate}</p>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <div className="cursor-pointer text-green-900/50 hover:text-green-900" onClick={handleAccept}>
                            <CheckIcon className="h-5 w-5 mr-2" title="Accept" />
                            Accept
                        </div>
                        <div className="cursor-pointer text-red-900/50 hover:text-red-900" onClick={() => handleDelete()}>
                            <XMarkIcon className="h-5 w-5" title="Reject" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default applicant;
