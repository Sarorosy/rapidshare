import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, X } from "lucide-react"; // Add X icon
import toast from "react-hot-toast";
import { useAuth } from "../utils/idb";
import GetFilesHistory from "./GetFilesHistory";
import { FadeLoader, ScaleLoader } from "react-spinners";
import TrashedFiles from "./TrashedFiles";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const { user } = useAuth();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const filesWithMeta = newFiles.map((file) => ({
      file,
      filename: file.name,
      accessType: "download",
    }));
    setFiles((prev) => [...prev, ...filesWithMeta]);
  };

  const updateFile = (index, key, value) => {
    const updatedFiles = [...files];
    updatedFiles[index][key] = value;
    setFiles(updatedFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    toast.success("File removed");
  };

  const [isUploading, setIsUploading] = useState(false);

  const uploadAllFiles = async () => {
    if (!files.length) {
      return toast.error("No files to upload.");
    }

    const formData = new FormData();
    files.forEach((item, index) => {
      formData.append("files[]", item.file);
      formData.append(`filenames[${index}]`, item.filename);
      formData.append(`accessTypes[${index}]`, item.accessType);
    });
    formData.append("user_id", user.id); // Assuming API expects user_id
    formData.append("folder_id", selectedFolderId ?? 0); // Assuming API expects folder_id

    try {
      setIsUploading(true);
      const res = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/uploadAllFiles",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.ok) {
        toast.success("Files uploaded successfully!");
        setFiles([]); // Clear uploaded files
        fetchFiles(selectedFolderId);
      } else {
        toast.error(result.message || "Failed to upload files.");
      }
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const [historyFiles, setHistoryFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolderName, setSelectedFolderName] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleFolderClick = (folderName, folderId) => {
    setSelectedFolderName(folderName);
    setSelectedFolderId(folderId);
    fetchFiles(folderId);
  };

  const fetchFiles = async (folderId) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://rapidcollaborate.com/rapidshare/api/Api/getFilesHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            folder_id: folderId ?? 0,
          }),
        }
      );

      const data = await response.json();
      if (data.status && data.files) {
        setHistoryFiles(data.files);
        setFolders(data.folders || []);
      } else {
        console.error("No files found or error occurred");
      }
    } catch (err) {
      console.error("Error fetching files:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex items-start justify-center space-x-2 px-2">
      <div className="w-full max-w-3xl flex flex-col gap-4">
        <GetFilesHistory
          userId={user.id}
          fetchFiles={fetchFiles}
          loading={loading}
          files={historyFiles}
          folders={folders}
          handleFolderClick={handleFolderClick}
          selectedFolderName={selectedFolderName}
          selectedFolderId={selectedFolderId}
        />
      </div>
      
      <div className="p-6 max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-lg sticky top-0 h-full">
        <h1 className="select-none text-2xl font-semibold mb-6 flex items-center">
          Upload Files{" "}
          
        </h1>
        {selectedFolderName && (
            <p className="text-gray-600 my-3 f-11">Your files will be uploaded in the folder <span className="font-bold">{selectedFolderName}</span></p>
          )}

        {/* Drag & Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:bg-gray-50 transition mb-6"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-[#092e46] mb-2" />
          <p className="text-gray-600 select-none">
            Drag & drop files here or click to choose
          </p>
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* File List */}
        <div className="space-y-6 overflow-y-scroll max-h-[400px] py-2 px-1">
          {files.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* X Button to remove file */}
              <button
                onClick={() => removeFile(index)}
                disabled={isUploading}
                className="absolute top-2 right-2 bg-red-100 p-1 rounded-full text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <FileText className="text-blue-500" />
                <div className="text-sm text-gray-600">{item.file.name}</div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Filename
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={item.filename}
                    maxLength={40}
                    onChange={(e) =>
                      updateFile(index, "filename", e.target.value)
                    }
                  />
                </div>

                
              </div>
            </motion.div>
          ))}
        </div>
        {files.length > 0 && (
          <div className="mt-6 text-right flex justify-end">
            <button
              onClick={uploadAllFiles}
              disabled={isUploading}
              className={`relative  flex items-center justify-center gap-2 px-3 py-1 rounded text-white font-semibold transition-all duration-300 ${
                isUploading
                  ? "bg-[#bb4c0b] opacity-70 cursor-not-allowed"
                  : "bg-[#d7763d] hover:bg-[#bb4c0b] active:scale-95"
              }`}
            >
              {isUploading ? (
                <>
                  Uploading...
                  <ScaleLoader
                    color="#ffffff"
                    height={10}
                    width={3}
                    radius={2}
                    margin={2}
                  />
                </>
              ) : (
                "Upload All"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
