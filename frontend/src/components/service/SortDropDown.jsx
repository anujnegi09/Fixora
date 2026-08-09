import { FaChevronDown } from "react-icons/fa";

const SortDropdown = ({
  value,
  onChange,
  options = [
    {
      label: "Newest",
      value: "newest",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
    {
      label: "Highest Rated",
      value: "rating_desc",
    },
    {
      label: "Lowest Rated",
      value: "rating_asc",
    },
    {
      label: "Price: Low to High",
      value: "price_asc",
    },
    {
      label: "Price: High to Low",
      value: "price_desc",
    },
    {
      label: "Most Popular",
      value: "popular",
    },
  ],
}) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none
          h-12
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          shadow-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500
        "
      >
        <option value="" disabled hidden>
          Sort By
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FaChevronDown
        className="
      pointer-events-none
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-500
    "
      />
    </div>
  );
};

export default SortDropdown;
