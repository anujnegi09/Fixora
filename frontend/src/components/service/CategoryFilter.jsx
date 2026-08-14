import { FaChevronDown } from "react-icons/fa";

const categories = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "Cleaner",
  "Mechanic",
  "AC Repair",
  "Tutor",
  "Beautician",
  "other",
];

const CategoryFilter = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value || ""}
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
          pr-10
          shadow-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500
        "
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
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

export default CategoryFilter;