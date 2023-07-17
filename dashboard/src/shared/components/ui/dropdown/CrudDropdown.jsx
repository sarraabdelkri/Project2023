import { Menu } from "@headlessui/react";
import clsx from "clsx";
import Dropdown from "@/shared/components/ui/dropdown/Dropdown";

const CrudDropdown = ({ element, onAddClick, onDeleteClick }) => {
    return (
        <Dropdown element={element}>
            <Menu.Item>
                {({ active }) => (
                    <a
                        className={clsx(
                            active ? "bg-accent" : "text-primary-t",
                            "block px-4 py-2 text-sm cursor-pointer"
                        )}
                        onClick={() => onAddClick()}
                    >
                        Add
                    </a>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                    <a
                        className={clsx(
                            active ? "bg-accent" : "text-primary-t",
                            "block px-4 py-2 text-sm cursor-pointer"
                        )}
                        onClick={() => onDeleteClick()}
                    >
                        Delete selected
                    </a>
                )}
            </Menu.Item>
        </Dropdown>
    );
};

export default CrudDropdown;
