import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePause, X, Lock, FileText, CircleHelp , Trash2, ArrowDownToLine, Check, Download, } from "lucide-react";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import ConfirmationModal from "../components/ConfirmationModal";
import dayjs from "dayjs";

const FileSideBar = ({ onClose, fileId, userId, selectionNotification, deleteNotification }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/getFile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, file_id: fileId }),
        }
      );
      const data = await response.json();
      if (data.status) {
        if (data.file_present) {
          setFile(data.file);
        } else {
          toast.error(data.message || "File Not Found or Deleted");
          onClose();
        }
      } else {
        toast.error(data.message || "Error");
      }
    } catch (error) {
      toast.error("Failed to fetch tags.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFile();
  }, []);

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
    const expirationDate = new Date(date.replace(" ", "T"));
    const timeDiff = expirationDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) {
      return `Expired ${Math.abs(daysLeft)} days ago`;
    }
    return `Expires in: ${daysLeft} days`;
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const handledeleteclick = (fileId) => {
    setSelectedFileId(fileId);
    setDeleteModalOpen(true);
  };

  const handleDeleteFile = async () => {
    try {
      const response = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/deleteFile",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ file_id: selectedFileId, user_id: userId }),
        }
      );
      const data = await response.json();
      if (data.status) {
        toast.success(data.message || "File Deleted");
        setDeleteModalOpen(false);
        setSelectedFileId(null);
        fetchFiles(selectedFolderId);
      } else {
        toast.error(data.message || "Error while deleting file!");
      }
    } catch (err) {
      console.log(`error while deleting file : ${err}`);
    }
  };

  const [activeManageAccess, setActiveManageAccess] = useState(null); // file id
  const [selectedDuration, setSelectedDuration] = useState(""); // duration in days

  const durations = [
    { label: "7 days", value: 7 },
    { label: "15 days", value: 15 },
    { label: "30 days", value: 30 },
    { label: "60 days", value: 60 },
  ];

  const handleManageAccess = (fileId) => {
    setActiveManageAccess(fileId);
  };

  const handleConfirmAccess = async (fileId) => {
    try {
      const payload = {
        file_id: fileId,
        user_id: userId,
        time: selectedDuration, // in days
      };
      const response = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/updateAccess",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (data.status) {
        toast.success(data.message || "File Access Updated");
        deleteNotification(selectionNotification);
        onClose();
      } else {
        toast.error(data.message || "Error while updating access");
      }
    } catch (err) {
      console.log("error while updating access" + err);
    } finally {
      setActiveManageAccess(null);
      setSelectedDuration("");
    }
  };

  const handleCancelAccess = () => {
    setActiveManageAccess(null);
    setSelectedDuration("");
  };

  const isPast = (dateString) => {
    return dayjs(dateString).isBefore(dayjs());
  };

  

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 w-[500px] h-full bg-white shadow-lg z-50"
    >
      <div className="flex justify-between items-center px-4 py-3 border-b bg-[#D7763D] text-white">
        <h2 className="text-lg font-semibold">Users Request Count</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          <X />
        </button>
      </div>

      <div className="p-4">
        {loading && (
          <div className="w-full mx-auto">
            <ScaleLoader className="mx-auto ml-auto" />
          </div>
        )}
        {file && (
          <div
          className="select-none flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2 f-12 hover:shadow-lg transition-all ease-in-out duration-300 relative"
        >
          <div className="flex items-center gap-4">
            <FileText className="text-blue-500 w-8 h-8" />
            <div>
              <p className="f-17 font-semibold text-gray-800"
               data-tooltip-id={file.file_name.length > 30 ? "my-tooltip" : "dummy"}
               data-tooltip-content={file.file_name}
              >
                {file.file_name.length <= 30
                  ? file.file_name
                  : `${file.file_name.slice(0, 12)}...${file.file_name.slice(-15)}`}
              </p>

              <p className="f-12 text-gray-500 capitalize my-2">
                <span
                  className={`${file.access_type === "download"
                      ? "text-green-500"
                      : "text-black bg-gray-100 border py-0.5 px-2 rounded-full"
                    }`}
                >
                  {file.access_type}
                </span>{" "}
                • {formatUploadedAt(file.uploaded_at)}
              </p>
              <p className="f-12 text-gray-500 mt-1 flex items-center space-x-1">
                <CircleHelp
                  size={14}
                  className="cursor-pointer"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Files will expire after a certain period."
                />
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={`Expires on: ${formatDate(
                    file.date
                  )}`}
                >
                  {getDaysLeft(file.date)}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-end items-end space-x-3">

              <button
                onClick={() => handledeleteclick(file.id)} // Replace with actual trash logic
                className="f-12 text-red-500 hover:text-red-700 transition-colors  bg-red-100 rounded-full p-1 "
              >
                <Trash2 size={18} />
              </button>

              <a
                href={file.file_url}
                target="_blank"
                rel="noopener noreferrer"
                download={
                  file.access_type === "download"
                    ? file.file_url
                    : undefined
                }
                className="flex items-center justify-end text-sm text-white bg-[#D7763D] px-1 py-0.5 f-12 rounded hover:bg-[#bb4c0b] transition-colors mt-1"
              >
                {/* <ArrowDownToLine size={15} className="mr-2" /> */}
                <Download size={15} className="mr-2" />
                 {file.access_type === "download" ? "Download" : "View"}
              </a>
              {isPast(file.date) && !activeManageAccess && (
                <button
                  onClick={() => handleManageAccess(file.id)}
                  // underline
                  className="f-10 justify-center w-full flex text-black-500 hover:text-black-700 transition-colors mt-2 border hover:border-[#D7763D] rounded-md px-1 py-1"
                >
                  Manage Access
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right ms-2"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
                </button>
              )}
            </div>
            {activeManageAccess === file.id && (
              <div className="mt-3 flex items-center gap-3">
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm "
                >
                  <option value="">Select duration</option>
                  {durations.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleConfirmAccess(file.id)}
                  className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={handleCancelAccess}
                  className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
        )}

        {deleteModalOpen && (
          <ConfirmationModal
            title="Are You Sure Want to Delete?"
            message="Your file will be permanently deleted"
            onYes={handleDeleteFile}
            onClose={() => setDeleteModalOpen(false)}
          />
        )}
      </div>
    </motion.div>
  );
};

export default FileSideBar;
