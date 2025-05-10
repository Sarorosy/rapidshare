import { useState } from "react";
import { ArrowLeft, PlayIcon, PlaySquare } from "lucide-react";
import logo from "../assets/logo-black.png";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { useAuth } from "../utils/idb";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
  const [otpBtnDisabled, setOtpBtnDisabled] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtnDisabled(true); // Disable the button to prevent multiple submissions

    if (!username) {
      toast.error("Please enter username.");
      return;
    }

    try {
      const response = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );

      const data = await response.json();

      if (data.status) {
        setShowOtp(true);
        toast.success("OTP sent to your email.");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("OTP Error:", error);
    } finally {
      setSubmitBtnDisabled(false); // Re-enable the button after the request completes
    }
  };

  const handleHandleOtpSubmit = async (e) => {
    try {
      e.preventDefault();
      setOtpBtnDisabled(true); // Disable the button to prevent multiple submissions

      const otpValue = otp.join("");

      if (otpValue.length !== 6) {
        toast.error("Please enter a valid 6-digit OTP.");
        return;
      }

      const response = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, otp: otpValue }),
        }
      );

      const data = await response.json();

      if (data.status) {
        toast.success("OTP verified successfully.");
        login(data.user); // Call the login function with the user data
        navigate("/");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("OTP Error:", error);
    } finally {
      setOtpBtnDisabled(false); // Re-enable the button after the request completes
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleBack = () => {
    setShowOtp(false);
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff] px-2">
      <div className="bg-white rounded-2xl p-4 w-full max-w-sm border border-gray-300">
        {showOtp && (
            <div className="flex justify-start">
              <button
              onClick={handleBack}
              className="flex items-center text-sm text-[#092e46] hover:underline f-13"
            >
              <ArrowLeft size={13} className="mr-1" /> Back
            </button>
            </div>
        )}
        <div className="flex items-center gap-3 justify-center mb-1">
          <img src={logo} alt="RapidShare" className="h-10" />
          {/* <h1 className="text-2xl font-bold text-[#092e46]">RapidShare</h1> */}
        </div>
        {!showOtp && (
          <h2 className="text-xl font-semibold text-center text-gray-700 my-2">
            Login
          </h2>
        )}

        {!showOtp ? (
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Enter Username"
              className="form-control form-control-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <p
              onClick={() => navigate("/forgot-username")}
              className="cursor-pointer hover:underline text-start text-sm text-[#092e46]  hover:opacity-90 transition ms-1"
            >
              Forgot Username ?
            </p>
            <button
              type="submit"
              disabled={submitBtnDisabled}
              className="ml-auto flex items-center justify-center bg-[#D7763D] text-white text-sm py-1 rounded f-13 hover:opacity-90 transition px-2"
            >
              {!submitBtnDisabled && <span className="flex items-center "> Send OTP <PlayIcon size={11}  className="ml-1 fill-white" /></span>}
              {submitBtnDisabled && (
                <div className="ml-2">
                  <ScaleLoader
                    color="#ffffff"
                    height={10}
                    width={3}
                    radius={2}
                    margin={2}
                  />
                </div>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            
            <h2 className="text-xl font-semibold text-center text-gray-700 my-2">
              Verify OTP
            </h2>
            <p className="text-sm text-center text-gray-800">
              Enter the 6-digit OTP sent to your email
            </p>
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-9 h-9 text-center border rounded-md f-13 focus:outline-none focus:ring-2 focus:ring-[#092e46]"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                />
              ))}
            </div>
            <div className="flex justify-content-center">
              <button
                onClick={handleHandleOtpSubmit}
                disabled={otpBtnDisabled}
                className="flex items-center justify-center bg-[#D7763D] text-white py-1 px-2 rounded-lg transition f-13"
              >
                Verify OTP <PlayIcon size={11}  className="ml-1 fill-white" />

                {otpBtnDisabled && (
                  <div className="ml-1">
                    <ScaleLoader
                      color="#ffffff"
                      height={10}
                      width={3}
                      radius={2}
                      margin={2}
                    />
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
