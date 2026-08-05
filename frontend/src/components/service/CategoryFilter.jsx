const CategoryFilter = ({
  categories = [],
  value,
  onChange,
}) => {
  return (
    <div className="w-full">

      <label className="block mb-2 font-medium text-gray-700">
        Category
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
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

    </div>
  );
};

export default CategoryFilter;