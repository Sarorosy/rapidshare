import { X } from "lucide-react";
import React from "react";

const ConfirmationModal = ({ title, message, onYes, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-lg w-96 p-3 relative">
        <div className="flex justify-between mb-3 items-end">
          <h2 className="f-16 font-bold text-gray-800">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="btn btn-outline-danger btn-sm px-1"
          >
            <X size={13} />
          </button>
        </div>
        <p className="text-gray-600 mb-6 mt-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className=" btn btn-danger btn-sm f-13"
          >
            Cancel
          </button>
          <button
            onClick={onYes}
            className=" btn btn-success btn-sm f-13"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
