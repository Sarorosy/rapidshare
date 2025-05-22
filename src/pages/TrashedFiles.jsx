import {
    ArchiveRestore,
    ArrowDownToLine,
    ArrowUpToLine,
    CircleHelp,
    Expand,
    FileText,
    Minimize,
    RefreshCcw,
    RotateCcw,
    Trash2,
  } from "lucide-react";
  import React, { useEffect, useState } from "react";
  import { useAuth } from "../utils/idb";
import toast from "react-hot-toast";
  
  const TrashedFiles = () => {
    const [trashedFiles, setTrashedFiles] = useState([]);
    const [showFiles, setShowFiles] = useState(false);
    const [loading, setLoading] = useState(false);
    const [restoringFiles, setRestoringFiles] = useState({}); // Track restoring state for each file
    const { user } = useAuth(); // Assuming you have a way to get the current user
  
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://rapidcollaborate.com/rapidshare/api/Api/getTrashedFiles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user?.id }),
          }
        );
  
        const data = await response.json();
        if (data.status && data.files) {
          setTrashedFiles(data.files);
        } else {
          console.error("No files found or error occurred");
        }
      } catch (err) {
        console.error("Error fetching files:", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (user) fetchFiles();
    }, [user]);
  
    const renderSkeleton = () => (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-100 border border-gray-200 rounded-xl p-4 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 bg-gray-300 rounded" />
              <div>
                <div className="h-3 w-40 bg-gray-300 rounded mb-2"></div>
                <div className="h-2 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  
    // Helper function to format the uploaded_at date (with time)
    const formatUploadedAt = (date) => {
      return new Date(date).toLocaleString("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    };
  
    // Helper function to format the date (expiration date without time)
    const formatDate = (date) => {
      return new Date(date).toLocaleString("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
  
    const getDaysLeft = (date) => {
      const today = new Date();
      const expirationDate = new Date(date.replace(" ", "T")); // Convert '2025-06-23 22:24:29' to '2025-06-23T22:24:29'
      const timeDiff = expirationDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
      // If daysLeft is negative, it means the file is expired
      if (daysLeft < 0) {
        return `Expired ${Math.abs(daysLeft)} days ago`;
      }
      return `Expires in: ${daysLeft} days`;
    };
  
    const restoreFile = async (fileId) => {
      try {
        setRestoringFiles((prev) => ({ ...prev, [fileId]: true })); // Set restoring state for the specific file
        const response = await fetch(
          "https://rapidcollaborate.com/rapidshare/api/Api/restoreFile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ file_id: fileId, user_id: user?.id }),
          }
        );
        const data = await response.json();
        if (data.status) {
          setTrashedFiles((prev) => prev.filter((file) => file.id !== fileId));
          toast.success("File restored successfully!");
        } else {
          toast.error(data.message || "Failed to restore file.");
        }
      } catch (err) {
        console.error("Error restoring file:", err);
      } finally {
        setRestoringFiles((prev) => ({ ...prev, [fileId]: false })); // Reset restoring state for the specific file
      }
    };
  
    return (
      <div className=" border rounded-lg shadow-md bg-white transition-all duration-300">
        <div className="flex justify-between items-center mb-4 bg-red-50 p-3 border-b">
          <h1 className="text-xl font-semibold text-red-800 flex items-center">
            {" "}
            <Trash2 size={20} className="mr-1 text-red-600" />
            Trashed Files
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                fetchFiles();
              }}
              className="border rounded px-3 py-1 bg-white flex items-center text-sm text-gray-500 hover:text-[#092e46] transition"
            >
              <RefreshCcw
                className={`w-4 h-4 mr-1 ${loading && "animate-spin"}`}
              />{" "}
              Refresh
            </button>
            <button
              onClick={() => setShowFiles((prev) => !prev)}
              className="px-3 py-1 text-sm bg-[#092e46] text-white rounded "
            >
              {showFiles ? (
                <ArrowUpToLine size={22} />
              ) : (
                <ArrowDownToLine size={22} />
              )}
            </button>
          </div>
        </div>
  
        <div
          className={` transition-all duration-300 overflow-hidden ${showFiles ? "max-h-[500px]" : "max-h-0"}`}
        >
          <ul className="space-y-2 p-4">
            {loading ? (
              renderSkeleton()
            ) : trashedFiles.length === 0 ? (
              <li className="text-gray-500">No trashed files</li>
            ) : (
              trashedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {file.file_name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        <span
                          className={
                            file.access_type === "download"
                              ? "text-green-500"
                              : "text-blue-500"
                          }
                        >
                          {file.access_type}
                        </span>{" "}
                        • {formatUploadedAt(file.uploaded_at)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <CircleHelp
                          size={12}
                          className="mr-1 cursor-pointer"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Your files will be deleted after 60 days of uploaded date unless you restore it."
                        />
                        <span
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={`Expires on: ${formatDate(file.date)}`}
                        >
                          {getDaysLeft(file.date)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => restoreFile(file.id)}
                    disabled={restoringFiles[file.id]} // Disable button if restoring
                    className="flex items-center border  text-sm text-red-500 bg-gray-50 hover:bg-white-700 px-4 py-1 rounded-lg transition"
                  >
                    <RotateCcw className={`mr-1 ${restoringFiles[file.id] && 'animate-spin'}`} />
                    Restore
                  </button>
                </div>
              ))
            )}
          </ul>
        </div>
      </div>
    );
  };
  
  export default TrashedFiles;
  