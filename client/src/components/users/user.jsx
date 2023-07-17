import {
    UserCircleIcon,
    NoSymbolIcon,
    CheckCircleIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";

import useUserStore from "@/store/userStore";
import { toast } from "react-toastify";

export function User({ user }) {
    const userId = user._id;
    console.log("userId", userId);
    const date = new Date(user.createdAt);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1
        }/${date.getFullYear()}`;

    const banUser = useUserStore((state) => state.banUser);
    const unbanUser = useUserStore((state) => state.unbanUser);
    const fetchUsers = useUserStore((state) => state.fetchUsers);

    const handleClick = async () => {
        if (!user.banned) {
            await banUser(user._id).then(() => toast.error("User banned"));
        } else {
            await unbanUser(user._id).then(() => toast.success("User unbanned"));
        }
        fetchUsers();
    };

    return (
        <div className=" rounded-md bg-gray-100">
            <div className="flex justify-between px-5 py-4">
                <div className="flex">
                    <div className="ml-3">
                        <div className="flex items-center">
                            <div className="mt-16 flex items-center">
                                <img
                                    src={`https://expertise-shaper-37ut.onrender.com/api/uploads/${user.profilePicture}`}
                                    width="50"
                                    height="50"
                                    alt="Profile Picture"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                            {user.verified && (
                                <CheckCircleIcon
                                    className="h-5 w-5 text-green-500"
                                    title="Verified"
                                />
                            )}
                        </div>

                        <div className="mt-2 text-sm text-gray-800">
                            <p>{user.email}</p>
                        </div>
                        {user.createdAt && (
                            <div className="mt-2 text-xs text-gray-500">
                                <p>Account created: {formattedDate}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <div onClick={() => handleClick()}>
                        {!user.banned ? (
                            <div className="cursor-pointer text-red-900/50 hover:text-red-900">
                                <NoSymbolIcon className="h-5 w-5" title="Ban user" />
                            </div>
                        ) : (
                            <div className="cursor-pointer text-green-900/50 hover:text-green-900">
                                <CheckIcon className="h-5 w-5" title="Unban user" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
