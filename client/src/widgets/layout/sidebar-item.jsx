import { Link } from "react-router-dom";

export function SidebarItem({ children, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1 rounded p-2 hover:bg-gray-400/10"
    >
      {children}
    </Link>
  );
}

export default SidebarItem;
