import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>

      {/* Search Icon */}

      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          py-3
          pl-11
          pr-11
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          transition
        "
      />

      {/* Clear Button */}

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
        >
          <FaTimes />
        </button>
      )}

    </div>
  );
};

export default SearchBar;