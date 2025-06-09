import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Folder, FolderClosed } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../utils/idb";

const MoveModal = ({ file, folders, onClose, after }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { user } = useAuth();
  const [moving, setMoving] = useState(false);

  const handleMove = async () => {
    if (selectedFolder) {
      try {
        setMoving(true);
        const response = await fetch(
          "https://rapidcollaborate.com/rapidshare/api/Api/MoveFile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file_id: file.id,
              folder_id: selectedFolder?.id,
              user_id: user?.id,
            }),
          }
        );
        const data = await response.json();
        if(data.status){
            toast.success("File moved successfully");
            onClose();
            after();
        }else{
            toast.error(data.message || "Failed to move file");
        }
      } catch (e) {
        console.log(e);
      }finally{
        setMoving(false);
      }
      
    } else {
      toast.error("Please select a folder");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white w-full max-w-md rounded-xl p-3 shadow-xl"
      >
        <h2 className="text-lg font-semibold mb-2">Move File</h2>
        <p className="select-none flex items-start justify-between bg-white border border-gray-200 rounded-xl px-2 py-2 f-12 hover:shadow-lg transition-all ease-in-out duration-300 relative me-2 mb-2">
          <div className="flex items-start">
            <FileText className="text-blue-500 me-1" size={20} />
            {file?.file_name || "Unnamed File"}
          </div>
        </p>
        <ArrowDown size={14} className="mx-auto my-2 animate-bounce" />

        {folders && folders.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 mb-4 max-h-64 overflow-y-auto">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setSelectedFolder(folder)}
                className={`cursor-pointer flex items-center justify-start rounded-xl p-2 px-2  border
                    ${
                      selectedFolder?.id == folder.id
                        ? " border-blue-700 bg-blue-100"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }
                `}
              >
                <div className="text-[#092e46]  rounded-full flex items-center justify-center">
                  <FolderClosed size={20} className="fill-orange-200" />
                </div>
                <h3 className="font-semibold text-gray-800 ml-2 select-none f-14">
                  {folder.name}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-4">No folders available.</p>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleMove}
            disabled={!selectedFolder || moving}
            className={`px-3 py-1 text-sm rounded text-white ${
              selectedFolder
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {moving ? "Moving..." : "Move"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoveModal;
