import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  icon = <FaInbox size={60} />,
  title = "Nothing Here",
  message = "There is no data to display.",
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
    </div>
  );
};

export default EmptyState;