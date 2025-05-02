import React, { useState } from "react";
import { ArrowLeft, Copy, UserCircle } from "lucide-react";
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
        `https://dissertationindia.com/rapidshare/api/Api/getAllAccounts`,
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
    <div className="min-h-screen flex items-center justify-center bg-[#092e4652] px-2">
      <div className="bg-white rounded-2xl shadow-xl px-6 py-5 w-full max-w-sm space-y-5">
        {/* Back Arrow */}
        <button
          onClick={() => navigate("/login")}
          className="mb-4 flex items-center text-sm text-[#092e46] hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
        </button>

        <h1 className="text-xl font-semibold mb-4">Recover Usernames</h1>

        <div className="bg-white px-2 py-1 rounded">
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#092e46]"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Find Button */}
          <button
            onClick={handleFind}
            disabled={finding}
            className="flex items-center justify-center w-full bg-[#092e46] text-white rounded-lg py-2  transition"
          >
            Find Accounts

            {finding && (
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

          {/* Accounts List */}
          {accounts.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-sm text-gray-500 mb-2">Usernames found:</h2>
              {accounts.map((account, index) => (
                <div
                  key={account.id || index}
                  className="flex items-center justify-between border border-gray-200 rounded-xl p-3 bg-white shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <UserCircle className="w-6 h-6 text-blue-500" />
                    <span className="text-sm text-gray-700">
                      {account.username}
                    </span>
                  </div>
                  <button onClick={() => handleCopy(account.username)}>
                    <Copy className="w-4 h-4 text-gray-400 hover:text-blue-500" />
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
