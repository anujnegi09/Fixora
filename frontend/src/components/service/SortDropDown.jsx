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
    <div className="w-full">

      <label className="block mb-2 font-medium text-gray-700">
        Sort By
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
      >
        <option value="">Default</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}

      </select>

    </div>
  );
};

export default SortDropdown;