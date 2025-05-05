import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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

  const {login} = useAuth();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtnDisabled(true); // Disable the button to prevent multiple submissions

    if (!username) {
      toast.error("Please enter username.");
      return;
    }

    try {
      const response = await fetch(
        "https://dissertationindia.com/rapidshare/api/Api/login",
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
    try{
      e.preventDefault();
      setOtpBtnDisabled(true); // Disable the button to prevent multiple submissions

      const otpValue = otp.join("");

      if (otpValue.length !== 6) {
        toast.error("Please enter a valid 6-digit OTP.");
        return;
      }

      const response = await fetch(
        "https://dissertationindia.com/rapidshare/api/Api/verifyOtp",
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
        navigate("/")
      } else {
        toast.error(data.message || "Something went wrong.");
      }

    
    }catch(error){
      console.error("OTP Error:", error);
    }finally{
      setOtpBtnDisabled(false); // Re-enable the button after the request completes
    }
  }

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
      <div className="bg-white rounded-2xl  px-6 py-5 w-full max-w-sm space-y-5 border border-gray-300">
        <div className="flex items-center gap-3 justify-center mb-1">
          <img src={logo} alt="RapidShare" className="h-14" />
          {/* <h1 className="text-2xl font-bold text-[#092e46]">RapidShare</h1> */}
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-700 top-12">
          {showOtp ? "Verify OTP" : "Login"}
        </h2>

        {!showOtp ? (
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7763D]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <p 
        onClick={()=>navigate("/forgot-username")}
        className="cursor-pointer text-start text-sm text-[#092e46] font-medium hover:opacity-90 transition ms-1">Forgot Username</p>
            <button
              type="submit"
              disabled={submitBtnDisabled}
              className=" w-[21%]  ml-auto  flex items-center  font-semibold justify-center bg-[#D7763D] text-white text-sm py-1 rounded  hover:opacity-90 transition" 
            >
               {!submitBtnDisabled && (
             <span> Send OTP</span>
               )}
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
            <button
              onClick={handleBack}
              className="flex items-center text-sm text-[#092e46] hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <p className="text-sm text-center text-gray-600">
              Enter the 6-digit OTP sent to your email
            </p>
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-10 h-10 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#092e46]"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                />
              ))}
            </div>
            <button 
            onClick={handleHandleOtpSubmit}
            disabled={otpBtnDisabled}
            className="flex items-center font-semibold justify-center w-full bg-[#D7763D] text-white py-2 rounded-lg transition">
              Verify OTP

              {otpBtnDisabled && (
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
          </div>
        )}

      </div>
    </div>
  );
}
