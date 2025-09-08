import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, X } from "lucide-react"; // Add X icon
import toast from "react-hot-toast";
import { useAuth } from "../utils/idb";
import GetFilesHistory from "./GetFilesHistory";
import { FadeLoader, ScaleLoader } from "react-spinners";
import TrashedFiles from "./TrashedFiles";
import FileUploadInfo from "../components/FileUploadInfo";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const { user } = useAuth();

  const [readInfo, setReadInfo]= useState(false);

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
      duration: 7,
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
  const durations = [
    { label: "7 days", value: 7 },
    { label: "15 days", value: 15 },
    { label: "30 days", value: 30 },
    { label: "60 days", value: 60 },
  ];

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
      formData.append(`accessDuration[${index}]`, item.duration);
    });
    formData.append("user_id", user?.id); // Assuming API expects user_id
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
      setReadInfo(true);
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
            user_id: user?.id,
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

  // if(!readInfo){
  //   return <FileUploadInfo setReadInfo={setReadInfo} />
  // }

  return (
    <div className={`${!readInfo ? "flex flex-col-reverse w-full mx-auto" : "row"} min-h-full`}>
      <div className={`${!readInfo ? "" : "col-md-7 flex flex-col gap-4"} `}>
        {(!readInfo) ? (<FileUploadInfo setReadInfo={setReadInfo} />) : 
        (<GetFilesHistory
          userId={user?.id}
          fetchFiles={fetchFiles}
          loading={loading}
          files={historyFiles}
          folders={folders}
          handleFolderClick={handleFolderClick}
          selectedFolderName={selectedFolderName}
          selectedFolderId={selectedFolderId}
        />)}
      </div>

      <div  className={`${!readInfo ? "bg-green-50 text-center px-4 py-[100px] flex flex-col justify-center items-center" : "col-md-5"} `}>
          {!readInfo && (
            <div className="mb-4">
           <h1 className="text-[25px] font-bold mb-3">
          Welcome to the <span  className="text-green-600">File Upload Portal</span>
        </h1>
        <p className="text-gray-600 text-[15px] px-[100px]">
          We understand that your thesis and research files are valuable and
          confidential. Our platform is designed to make your experience secure,
          simple, and trustworthy. Here's everything you need to know before
          uploading your documents.
        </p>
          
          </div>
          
          )}
        <div className={`${!readInfo ? "bg-white rounded shadow-sm sticky top-0  p-3 w-[400px]" : "bg-white rounded shadow-sm sticky top-0  p-3"} `}>
          <h1 className={`${!readInfo ? "hidden" : "select-none f-16 font-semibold mb-3 flex items-center"} `}>
            Upload Files{" "}
          </h1>
          {selectedFolderName && (
            <p className="text-gray-600 my-3 f-11">
              Your files will be uploaded in the folder{" "}
              <span className="font-bold">{selectedFolderName}</span>
            </p>
          )}

          {/* Drag & Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-4 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <UploadCloud className="mx-auto text-[#092e46] mb-2" size={25} />
            <p className="text-gray-600 select-none f-14">
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
          <div
            className={`space-y-6 overflow-y-auto max-h-[400px] ${
              files && files.length > 0 ? " pb-2 px-0" : ""
            }`}
          >
            {files.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-sm rounded py-2 px-2 border border-gray-200 relative mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* X Button to remove file */}

                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="text-blue-400" size={20} />
                    <div className="f-13 font-semibold text-gray-800 line-break">
                      {item.file.name}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFile(index)}
                    disabled={isUploading}
                    className="btn btn-outline-danger btn-sm px-1 border-0"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="flex gap-2 mt-1">
                  <div className="bg-light p-2 w-full ">
                    <label className="block f-12 font-medium mb-1">
                      Edit Filename :
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 f-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={item.filename}
                      maxLength={40}
                      onChange={(e) =>
                        updateFile(index, "filename", e.target.value)
                      }
                    />
                  </div>
                  <div className="bg-light p-2 ">
                    <label className="block f-12 font-medium mb-1 white-space-nowrap">
                      Access Duration:
                    </label>
                    <select
                      value={item.duration}
                      onChange={(e) =>
                        updateFile(index, "duration", parseInt(e.target.value))
                      }
                      className="form-select form-select-sm f-12"
                    >
                      {durations.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {files.length > 0 && (
            <div className="mt-2 text-right flex justify-end">
              <button
                onClick={uploadAllFiles}
                disabled={isUploading}
                className={`relative  flex items-center justify-center gap-2 px-2  f-12 py-0.5 rounded text-white transition-all duration-300 ${
                  isUploading
                    ? "bg-[#72afa3] opacity-70 cursor-not-allowed"
                    : "btn btn-success btn-sm active:scale-95"
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
    </div>
  );
};

export default Dashboard;
