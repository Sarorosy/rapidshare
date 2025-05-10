import React, { useState } from "react";
import { ArrowLeft, Copy, PlayIcon, UserCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const ForgotUsername = () => {
  const [email, setEmail] = useState("");
  const [finding, setFinding] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const handleFind = async () => {
    if (!email) {
      toast.error("Please enter an email");
      return;
    }

    try {
        setFinding(true);
      const response = await fetch(
        `https://rapidcollaborate.com/rapidshare/api/Api/getAllAccounts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        }
      );
      const data = await response.json();
      if (data.status) {
        if (data.accounts.length == 0) {
          toast.error("No Accounts Found with this email");
        } else {
          setAccounts(data.accounts || []);
        }
      } else {
        toast.error(data.message || "Failed to fetch files.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }finally{
        setFinding(false)
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Username copied!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff] px-2">
      <div className="bg-white rounded-2xl p-4 w-full max-w-sm  border border-gray-300">
        {/* Back Arrow */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/login")}
            className="mb-2 flex items-center  text-sm text-[#092e46] hover:underline f-13"
          >
            <ArrowLeft size={13} className="mr-1" /> Back to Login
          </button>
        </div>

        <h1 className="text-xl font-semibold mb-3">Recover Usernames</h1>

        <div className="bg-white rounded">
          {/* Email Input */}
          <div className="mb-3">
            <label className="block text-sm  text-gray-800 mb-1">
              Enter Your Email
            </label>
            <input
              type="email"
              className="form-control form-control-sm"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Find Button */}
          <div className="justify-end flex">
            <button
              onClick={handleFind}
              disabled={finding}
              className="text-sm flex items-center justify-center bg-[#D7763D] text-white rounded py-1 px-2 transition f-13"
            >
              {!finding && ( 
                <span className="flex items-center ">Find Accounts <PlayIcon size={11}  className="ml-1 fill-white" /></span>
              )}
              
              {finding && (
                  <div className="">
                    <ScaleLoader
                      color="#ffffff"
                      height={8}
                      width={3}
                      radius={2}
                      margin={2}
                    />
                  </div>
                )}
            </button>
          </div>

          {/* Accounts List */}
          {accounts.length > 0 && (
            <div className="mt-3">
              <h2 className="block text-sm  text-gray-800">Usernames Found</h2>
              {accounts.map((account, index) => (
                <div
                  key={account.id || index}
                  className="flex items-center justify-between border border-gray-200 rounded-xl p-2  bg-white shadow-sm mt-2"
                >
                  <div className="flex items-center">
                    <UserCircle size={20} className="text-blue-500" />
                    <span className="text-sm text-gray-700 f-13 ms-1">
                      {account.username}
                    </span>
                  </div>
                  <button onClick={() => handleCopy(account.username)}>
                    <Copy size={15} className="text-gray-400 hover:text-blue-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotUsername;
