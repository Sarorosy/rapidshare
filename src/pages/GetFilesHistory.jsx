import React, { useEffect, useState, useRef } from "react";
import {
  CircleHelp,
  FileText,
  RefreshCcw,
  FolderPlus,
  X,
  Home,
  FolderClosed,
  Trash2,
  EllipsisIcon,
  Check,
  ArrowDownToLine,
  Download,
  MoveRightIcon,
  Move,
  Folder,
} from "lucide-react";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import dayjs from "dayjs";
import upleft from "../assets/upleft.svg";

import ConfirmationModal from "../components/ConfirmationModal";
import MoveModal from "../components/MoveModal";
const GetFilesHistory = ({
  userId,
  fetchFiles,
  loading,
  files,
  folders,
  handleFolderClick,
  selectedFolderName,
  selectedFolderId,
}) => {
  useEffect(() => {
    if (userId) fetchFiles(0);
  }, [userId]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

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
        fetchFiles(selectedFolderId);
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

  const handleCreateFolder = async () => {
    if (folderName.trim() !== "") {
      await createFolder(folderName.trim());
      fetchFiles();
      setIsModalOpen(false);
      setFolderName("");
    }
  };

  const createFolder = async (folderName) => {
    try {
      setIsCreatingFolder(true);
      const response = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/createFolder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: folderName, user_id: userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create folder");
      }
      const data = await response.json();
      if (data.status) {
        toast.success("Folder created successfully!");
        fetchFiles();
      } else {
        toast.error(data.message || "Failed to create folder.");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    } finally {
      setIsCreatingFolder(false);
      setFolderName("");
    }
  };

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

  const [selectedFile, setSelectedFile] = useState(null);
  const [moveFileOpen, setMoveFileOpen] = useState(false);
  const handleMoveclick = (file) => {
    setSelectedFile(file);
    setMoveFileOpen(true);
  };

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFolderNameRef, setSelectedFolderNameRef] = useState(null);
  const optionsRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsOptionsVisible(false);
        setSelectedFolder(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (folderId, folderName) => {
    if (selectedFolder == folderId) {
      // If clicking the same folder again, toggle it
      setIsOptionsVisible(!isOptionsVisible);
    } else {
      setSelectedFolder(folderId);
      setSelectedFolderNameRef(folderName);
      setIsOptionsVisible(true);
    }
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const handleRenameFolder = () => {
    console.log(`Rename folder id ${selectedFolder}`);
    setEditModalOpen(true);
    setIsOptionsVisible(false);
  };

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const handleDeleteFolder = () => {
    setIsOptionsVisible(false);
    setDeleteConfirmationOpen(true);
  };

  const deleteFolder = async () => {
    try {
      const response = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/deleteFolder",
        {
          method: "POST",
          headers: { "COntent-type": "application/json" },
          body: JSON.stringify({ folder_id: selectedFolder, user_id: userId }),
        }
      );
      const data = await response.json();
      if (data.status) {
        toast.success(data.message || "Folder Deleting Successfully");
        fetchFiles(0);
      } else {
        toast.error(data.message || "Failed to delete folder");
      }
    } catch (err) {
      console.log("errror while deleting folder : " + err);
    } finally {
      setDeleteConfirmationOpen(false);
    }
  };

  const handleupdateFolder = async () => {
    try {
      if (selectedFolderNameRef.trim() == "") {
        toast.error("Folder name required!");
        return;
      }
      setEditing(true);
      const response = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/updateFolderName",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedFolderNameRef,
            user_id: userId,
            id: selectedFolder,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update folder");
      }
      const data = await response.json();
      if (data.status) {
        toast.success("Folder updated successfully!");
        fetchFiles();
      } else {
        toast.error(data.message || "Failed to update folder.");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    } finally {
      setEditing(false);
      setSelectedFolderNameRef(null);
      setEditModalOpen(false);
      setSelectedFolder(null);
    }
  };

  return (
    <div className="bg-white p-3 rounded shadow-sm">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-lg w-96 p-3 relative">
            <div className="flex justify-between mb-3 items-end">
              <h2 className="f-16 font-bold text-gray-800">
                Create New Folder
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-outline-danger btn-sm px-1"
              >
                <X size={13} />
              </button>
            </div>
            <input
              type="text"
              value={folderName}
              maxLength={30}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="form-control form-control-sm mb-2"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCreateFolder}
                disabled={isCreatingFolder}
                className=" btn btn-success btn-sm f-14"
              >
                Create Folder
                {isCreatingFolder && (
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
          </div>
        </div>
      )}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Update Folder Name
            </h2>
            <input
              type="text"
              value={selectedFolderNameRef}
              onChange={(e) => setSelectedFolderNameRef(e.target.value)}
              placeholder="Enter folder name"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#092e46]"
            />
            <button
              onClick={handleupdateFolder}
              disabled={editing}
              className=" flex items-center justify-center w-full bg-[#bb4c0b] text-white py-1.5 rounded-lg hover:bg-[#d7763d] transition"
            >
              Update Folder
              {editing && (
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
        </div>
      )}
      {/* <div className="flex items-center justify-between"> */}
        {/* <h2 className="f-16 font-semibold text-gray-800">
          Your Uploaded Files
        </h2> */}

        
      {/* </div> */}
      <div className="space-x-2 text-sm text-gray-600 mb-3 rounded flex justify-between ps-2">
        <div className="flex gap-3">
        {!selectedFolderName ? (
          <span className="cursor-pointer hover:text-blue-600 flex items-center space-x-1">
            <Home size={20} onClick={() => handleFolderClick(null, 0)} />
            <span>/</span>
          </span>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 flex items-center space-x-1 cursor-pointer">
              <Home size={20} onClick={() => handleFolderClick(null, 0)} />
              <span>/</span>
            </span>
            <span className="cursor-pointer hover:text-blue-600">
              {selectedFolderName}
            </span>
          </div>
        )}
        </div>
        <div className="flex gap-3">
          {!selectedFolderName ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center btn btn-success btn-sm f-11 py-0.5"
            >
              <FolderPlus className="mr-1" size={11} />
              New Folder
            </button>
          ) : (
            <button
              onClick={() => {
                handleFolderClick(null, 0);
              }}
              className="flex items-center f-11 btn btn-outline-dark btn-sm  py-0.5"
            >
              <img src={upleft} className="w-3 h-3 mr-1 rotate-90" />
              Back
            </button>
          )}

          <button
            onClick={() => {
              fetchFiles(selectedFolderId);
            }}
            className={`flex items-center btn btn-light btn-sm f-11 py-0.5`}
          >
            <RefreshCcw
              size={11}
              className={`mr-1 ${loading && "animate-spin"}`}
            />{" "}
            Refresh
          </button>
        </div>
      </div>
      <div>

      {loading
        ? renderSkeleton()
        : folders.length > 0 &&
          !selectedFolderName && (
            <>
            <div className="n-folder-set mb-3">
              <div className="grid grid-cols-1 gap-2 ">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    onDoubleClick={() =>
                      handleFolderClick(folder.name, folder.id)
                    }
                    className="relative cursor-pointer flex items-center justify-start rounded border border-gray p-2 px-2 hover:shadow-sm hover:bg-gray-100 transition"
                  >
                    <div className="text-[#092e46]  rounded-full flex items-center justify-center">
                      <Folder size={20} className="fill-orange-200" stroke="0" />
                    </div>
                    <h3 className="font-semibold text-gray-800 ml-1 f-13">
                      {folder.name}
                    </h3>
                    <button
                      onClick={() => handleOptionClick(folder.id, folder.name)}
                      className="text-gray-500 hover:text-gray-900 ml-auto  px-1 py-0.5 "
                    >
                      <EllipsisIcon size={20} />
                    </button>

                    {/* Floating options */}
                    {isOptionsVisible && selectedFolder === folder.id && (
                      <div
                        ref={optionsRef}
                        className="absolute right-2 top-11 w-36 bg-white border rounded-md shadow-lg z-10 p-2"
                      >
                        <button
                          onClick={handleRenameFolder}
                          className="block w-full text-left text-sm p-2 hover:bg-gray-100"
                        >
                          Rename Folder
                        </button>
                        <button
                          onClick={handleDeleteFolder}
                          className="block w-full text-left text-sm text-red-500 p-2 hover:bg-gray-100"
                        >
                          Delete Folder
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              </div>
            </>
          )}

      {loading ? (
        renderSkeleton()
      ) : files.length === 0 ? (
        <div className="text-gray-500 text-center py-6 p-3">
          You haven’t uploaded any files yet.
        </div>
      ) : (
        <>
          <div className=" n-flies-list">
            <div className="grid grid-cols-3 gap-3">
            {files.map((file, idx) => (
              <div className="flex">
              <div
                key={idx}
                className="select-none w-100 p-2 rounded transition-all ease-in-out duration-300 relative"
              >
                <div className="">
                  
                  <div>
                    <p
                      className="f-12 font-semibold text-gray-800 flex items-start justify-between flex-row-reverse"
                      data-tooltip-id={
                        file.file_name.length > 30 ? "my-tooltip" : "dummy"
                      }
                      data-tooltip-content={file.file_name}
                    >
                      <FileText className="text-blue-400" size={20} /> {file.file_name.length <= 30
                        ? file.file_name
                        : `${file.file_name.slice(
                            0,
                            12
                          )}...${file.file_name.slice(-15)}`}
                    </p>

                    <div className="flex justify-start flex-col mt-1 gap-1">
                      <p className="f-10 text-gray-500 capitalize">
                        <span
                          className={`${
                            file.access_type === "download"
                              ? "text-green-500"
                              : "text-black bg-gray-100 border py-0.5 px-2 rounded-full"
                          }`}
                        >
                          {/* {file.access_type} */}
                          Uploaded
                        </span>{" "}
                        • {formatUploadedAt(file.uploaded_at)}
                      </p>
                      
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="">
                    <div className="flex items-center space-x-1 justify-between">
                      <div>
                        
                        <p className="f-10 text-gray-500 flex items-center space-x-1">
                          <span
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={`Expires on: ${formatDate(
                              file.date
                            )}`}
                          >
                            {getDaysLeft(file.date)}
                          </span>
                          <CircleHelp
                            size={14}
                            className="cursor-pointer"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Files will expire after a certain period."
                          />
                        </p>
                      </div>
                      <div className="flex gap-1">
                      
                      <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Move"
                        onClick={() => handleMoveclick(file)} // Replace with actual trash logic
                        className="btn btn-outline-primary btn-sm  border-0 px-1"
                      >
                        <Move size={11} />
                      </button>

                      

                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Download"
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={
                          file.access_type === "download"
                            ? file.file_url
                            : undefined
                        }
                        className="btn btn-outline-success btn-sm border-0 px-1"
                      >
                        {/* <ArrowDownToLine size={15} className="mr-2" /> */}
                        <Download size={11} className="" />
                        {/* {file.access_type === "download" ? "Download" : "View"} */}
                      </a>

                      <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Delete"
                        onClick={() => handledeleteclick(file.id)} // Replace with actual trash logic
                        className="btn btn-outline-danger btn-sm border-0 px-1"
                      >
                        <Trash2 size={11} />
                      </button>
                      </div>
                    </div>
                    <div>
                      {activeManageAccess === file.id && (
                          <div className="flex items-center gap-1 bg-white p-1 rounded mt-2">
                            <select
                              value={selectedDuration}
                              onChange={(e) => setSelectedDuration(e.target.value)}
                              className="form-select form-select-sm f-10"
                            >
                              <option value="">Select duration</option>
                              {durations.map((d) => (
                                <option key={d.value} value={d.value}>
                                  {d.label}
                                </option>
                              ))}
                            </select>
                              <button
                              onClick={handleCancelAccess}
                              className="btn btn-outline-danger btn-sm py-1 px-1 border-0"
                            >
                              <X size={11} />
                            </button>
                            <button
                              onClick={() => handleConfirmAccess(file.id)}
                              className="btn btn-outline-success btn-sm py-1 px-1 border-0"
                            >
                              <Check size={11} />
                            </button>
                            
                          </div>
                        )}
                        {isPast(file.date) && !activeManageAccess && (
                          <button
                            onClick={() => handleManageAccess(file.id)}
                            // underline
                            className="btn btn-outline-secondary btn-sm f-11 justify-center flex  px-1 py-0.5 mt-2 w-full"
                          >
                            Manage Access
                            <MoveRightIcon size={13} className="ms-1 mt-0.5" />
                          </button>
                        )}
                    </div>
                    
                    
                  </div>
                  
                </div>
              </div>
              </div>
            ))}
            </div>
          </div>
        </>
      )}
      </div>

      {deleteModalOpen && (
        <ConfirmationModal
          title="Are You Sure Want to Delete?"
          message="Your file will be permanently deleted"
          onYes={handleDeleteFile}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}

      {deleteConfirmationOpen && (
        <ConfirmationModal
          title="Are You Sure Want to Delete?"
          message="All the files will be permanently deleted inside this folder"
          onYes={deleteFolder}
          onClose={() => setDeleteConfirmationOpen(false)}
        />
      )}
      {moveFileOpen && (
        <MoveModal
        file={selectedFile}
        folders={folders}
        onClose={()=>{setMoveFileOpen(false)}}
        after={fetchFiles}
        />
      )}
    </div>
  );
};

export default GetFilesHistory;
