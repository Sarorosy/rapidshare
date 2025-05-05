import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CookiePopup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (accepted !== "true") {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-gray-700 px-6 py-5 shadow-lg z-50 text-sm border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-sm leading-relaxed">
          <strong className="font-semibold">About Cookies:</strong> By visiting this Site, you agree to our{" "}
          <span
            onClick={() => navigate("/terms-and-conditions")}
            className="text-blue-500 underline cursor-pointer"
          >
            Terms of Use
          </span>
          , including its legal provisions. You also agree to our use of cookies and similar technologies that monitor your interactions. If you do not agree, please do not use our Site. See our{" "}
          <span
            onClick={() => navigate("/terms-and-conditions")}
            className="text-blue-500 underline cursor-pointer"
          >
            Privacy Policy
          </span>{" "}
          for more info.
        </div>

        <button
          onClick={handleAccept}
          className="bg-blue-500 w-36 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Got It
        </button>
      </div>
    </div>
  );
};

export default CookiePopup;
