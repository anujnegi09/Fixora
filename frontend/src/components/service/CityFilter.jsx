const CityFilter = ({
  cities = [],
  value,
  onChange,
}) => {
  return (
    <div className="w-full">

      <label className="block mb-2 font-medium text-gray-700">
        City
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
        <option value="">All Cities</option>

        {cities.map((city) => (
          <option
            key={city}
            value={city}
          >
            {city}
          </option>
        ))}
      </select>

    </div>
  );
};

export default CityFilter;