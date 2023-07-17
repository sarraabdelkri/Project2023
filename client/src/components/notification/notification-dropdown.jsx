import { UserCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import notificationStore from "@/store/notificationStore";

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const getUserNotifications = notificationStore(
    (state) => state.getUserNotifications
  );
  const getnotifications = async () => {
    const response = await getUserNotifications(userId);
    setNotifications(response.data);
    setVisibleNotifications(response.data.slice(0, 5));
    setShowMore(response.data.length > 5);
  };
  useEffect(() => {
    getnotifications();
  }, []);

  const handleShowMore = () => {
    setVisibleNotifications(notifications);
    setShowMore(false);
  };

  return (
    <div className="relative">
      <div
        className="z-10  cursor-pointer rounded-md px-2 py-1 hover:bg-gray-400/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex select-none items-center gap-2 font-medium text-gray-900">
          <CheckCircleIcon className="h-6 w-6 " />
        </div>
      </div>
      <div
        className={`absolute right-0 top-11 z-10 w-48 rounded-md border border-gray-300 bg-white py-1 shadow-lg ${isOpen ? "block" : "hidden"
          }`}
      >
        {visibleNotifications && visibleNotifications.length > 0 ? (
          visibleNotifications.map((notification) => (
            <Link
              to={"/notifications"}
              className="flex gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              key={notification._id}
            >
              <div>
                <p style={{ color: "#2F5635" }}>{notification.message}</p>
                <p style={{ textAlign: "right", fontSize: "0.8rem" }}>
                  <small>
                    {new Date(notification.createdAt)
                      .toISOString()
                      .slice(0, 16)
                      .replace("T", " ")}
                  </small>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="mt-2 mb-2 ml-10" style={{color:"#D2D2D2"}}>No notifications</p>
        )}
        {showMore && (
          <button
            className="flex gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={handleShowMore}
          >
            <div>Show more</div>
          </button>
        )}
      </div>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-0 h-screen w-screen"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default NotificationDropdown;
