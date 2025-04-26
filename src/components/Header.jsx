import { useAuth } from "../utils/idb.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { LogOut, CircleUserRound} from "lucide-react";
import logo from "../assets/fileblue.svg";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
            <img src={logo} className="w-14 h-14 mr-2" />
          </span>{" "}
          RapidShare
        </h1>

        {user ? (
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center px-3 py-2 rounded-md bg-gray-100 text-black  transition mr-3"
              >
                <CircleUserRound className="w-4 h-4 mr-2"/><span>{user.email}</span>
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
    </header>
  );
}
