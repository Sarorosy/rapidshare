import { useAuth } from "../utils/idb.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { LogOut, CircleUserRound, Bell } from "lucide-react";
import logo from "../assets/logo-black.png";
import NotificationLoader from "./NotificationLoader.jsx";
import { AnimatePresence } from "framer-motion";
import FileSideBar from "../pages/FileSideBar.jsx";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const [notiLoading, setNotiLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setNotiLoading(true);
      const res = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/fetchNotifications",
        {
          method : "POST",
          headers : {
            "Content-type" : "application/json"
          },
          body: JSON.stringify({user_id: user.id})
        }
      );
      const data = await res.json();
      if (data.status) {
        setNotifications(data.notifications || []);
        setUnreadCount((data.notifications || []).length);
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
    }finally{
      setNotiLoading(false)
    }
  };

  // Handle notification bell click
  const handleNotifClick = () => {
    setNotifOpen(!notifOpen);
    if (notifOpen) {
      fetchNotifications();
    }
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [SidebarOpen, setSidebarOpen] = useState(false);

  const handleNotificationItemClick = (item) => {
    setSelectedNotification(item.id);
    setSelectedFileId(item.file_id);
    setNotifOpen(false);
    setSidebarOpen(true);
  }

  const deleteNotification = async (notifId) =>{
    try{
        const response = await fetch("https://rapidcollaborate.com/rapidshare/api/Api/deleteNotification",{
            method:"POST",
            headers:{
                "Content-type" : "application/json"
            },
            body: JSON.stringify({notification_id : notifId})
        })
        const data = await response.json()
        if(data.status){
            fetchNotifications();
        }
    }catch(err){
      console.log("error while deleting notification", err)
    }
  }

  return (
    <header className="bg-white text-[#092e46] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <h1
          className="text-2xl font-bold flex items-center cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <span role="img" aria-label="plate">
            <img src={logo} className="w-25 h-14" />
          </span>{" "}
          
        </h1>

        {user ? (
          <div className="flex items-center space-x-4 text-sm">
            <div className="relative" ref={notifRef}>
              <button
                onClick={handleNotifClick}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Notifications"
                className="relative p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition"
              >
                <Bell className="w-6 h-6 text-[#092e46]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {notifOpen && (
                <div className="absolute right-[-180px] mt-2 w-96 bg-white shadow-lg rounded-lg p-4 overflow-auto max-h-80 z-50 border">
                  <h2 className="text-lg font-semibold mb-3 text-[#092e46]">
                    Notifications
                  </h2>
                  {notiLoading ? (<NotificationLoader />) : notifications.length === 0 ? (
                    <p className="text-gray-500 text-sm">No notifications</p>
                  ) : (
                    <ul className="space-y-2">
                      {notifications.map((notif, index) => (
                        <li
                          key={index}
                          onClick={()=>{handleNotificationItemClick(notif)}}
                          className="bg-gray-100 p-2 rounded hover:bg-blue-100 transition cursor-pointer"
                        >
                          {notif.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user.email}
                className="flex items-center px-3 py-2 rounded-md bg-gray-100 text-black  transition mr-3"
              >
                <CircleUserRound className="w-4 h-4 mr-2" />
                <span>{user.username}</span>
              </button>
              <button
                onClick={logout}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Logout"
                className="flex hover:bg-red-500 hover:text-white items-center px-3 py-2 rounded-md bg-gray-100 text-black  transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          navigate("/login")
        )}
      </div>

      <AnimatePresence>
        {SidebarOpen && (
          <FileSideBar onClose={()=>{setSidebarOpen(false)}} fileId={selectedFileId} userId={user.id} selectionNotification={selectedNotification} deleteNotification={deleteNotification}/>
        )}
      </AnimatePresence>
    </header>
  );
}
