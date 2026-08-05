import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import LocationPicker from "./LocationPicker";

const LocationModal = ({ onClose }) => {

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-2xl
          rounded-2xl
          bg-white
          shadow-2xl
          overflow-hidden
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Change Location
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-gray-500
              hover:bg-gray-100
              hover:text-red-500
              transition
            "
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Body */}

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <LocationPicker onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
export default LocationModal;