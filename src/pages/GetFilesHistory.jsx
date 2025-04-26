import React, { useEffect } from "react";
import { CircleHelp, FileText, RefreshCcw } from "lucide-react";

const GetFilesHistory = ({ userId, fetchFiles, loading, files }) => {
  useEffect(() => {
    if (userId) fetchFiles();
  }, [userId]);

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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl w-full mx-auto ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Uploaded Files
        </h2>
        <button
          onClick={() => {
            fetchFiles();
          }}
          className={`flex items-center text-sm text-gray-500 hover:text-[#092e46] transition `}
        >
          <RefreshCcw className={`w-4 h-4 mr-1 ${loading && "animate-spin"}`} /> Refresh
        </button>
      </div>

      {loading ? (
        renderSkeleton()
      ) : files.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          You haven’t uploaded any files yet.
        </div>
      ) : (
        <div className="space-y-4 h-full overflow-y-scroll px-1 sticky top-0">
          {files.map((file, idx) => (
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
              <a
                href={file.file_url}
                target="_blank"
                rel="noopener noreferrer"
                download={
                  file.access_type === "download" ? file.file_url : undefined
                }
                className="text-sm text-white bg-[#092e46]  px-4 py-1.5 rounded-lg transition hover:decoration-none"
              >
                {file.access_type === "download" ? "Download" : "View"}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetFilesHistory;
