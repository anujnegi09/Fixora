import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";

const CustomToast = ({ t, message, type }) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`
        relative
        flex
        pointer-events-auto
        w-[360px]
        items-center
        gap-3
        overflow-hidden
        rounded-xl
        bg-white
        px-4
        py-3
        shadow-lg
        border
        ${isSuccess ? "border-green-100" : "border-red-100"}
      `}
    >
      {/* Icon */}

      {isSuccess ? (
        <FaCheckCircle className="shrink-0 text-lg text-green-500" />
      ) : (
        <FaExclamationCircle className="shrink-0 text-lg text-red-500" />
      )}

      {/* Message */}

      <p className="flex-1 text-sm font-medium text-gray-700">{message}</p>

      {/* Close button */}

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toast.remove(t.id);
        //   toast.dismiss(t.id);
        }}
        className="z-10 shrink-0 cursor-pointer text-gray-400 transition hover:text-gray-700"
      >
        <IoClose size={20} />
      </button>

      {/* Progress bar */}

      <div
        className={`
          absolute
          bottom-0
          left-0
          h-1
          ${isSuccess ? "bg-green-500" : "bg-red-500"}
        `}
        style={{
          animation: "toast-progress 3s linear forwards",
        }}
      />
    </div>
  );
};

export default CustomToast;
