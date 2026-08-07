import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  icon = <FaInbox size={60} />,
  title = "Nothing Here",
  message = "There is no data to display.",
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">

      {/* Icon */}

      <div className="text-gray-400 mb-5">
        {icon}
      </div>

      {/* Title */}

      <h2 className="text-2xl font-semibold text-gray-800">
        {title}
      </h2>

      {/* Message */}

      <p className="mt-2 text-gray-500 max-w-md">
        {message}
      </p>

      {/* Optional Button */}

      {/* {buttonText && (
        <button
          onClick={onButtonClick}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {buttonText}
        </button>
      )} */}

    </div>
  );
};

export default EmptyState;