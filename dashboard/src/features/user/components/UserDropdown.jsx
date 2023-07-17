import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { Settings, User as Profile, LogOut } from "react-feather";
import clsx from "clsx";
import Avatar from "@components/ui/avatars/Avatar";
import Dropdown from "@components/ui/dropdown/Dropdown";
import LogoutModal from "./modals/LogoutModal";
import { useNavigate } from "react-router-dom";

const UserDropdownAvatar = ({ user }) => {
    const navigate = useNavigate();
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    return (
        <>
            <Dropdown element={<Avatar className="h-12 w-12" />}>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            className={clsx(
                                active ? "bg-accent" : "text-primary-t/80",
                                "block px-4 py-2 text-sm cursor-pointer"
                            )}
                            onClick={() => { }}
                            href="https://localhost:5173"
                        >
                            <div className="flex items-center">
                                <LogOut size={20} className="w-6 mr-2" /> Back to app
                            </div>
                        </a>
                    )}
                </Menu.Item>
            </Dropdown>
            <LogoutModal
                openNow={isLogoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
            />
        </>
    );
};

export default UserDropdownAvatar;
