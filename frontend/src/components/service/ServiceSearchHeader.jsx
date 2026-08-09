import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import SortDropdown from "./SortDropdown";

const ServiceSearchHeader = ({
  location = "Select Location",
  search,
  setSearch,

  category,
  setCategory,

  sortBy,
  setSortBy,

  onLocationClick,
  isLocationOpen = false,

  showSearch = true,
  showCategory = true,
  showSort = true,
}) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4">
      {/* Location */}

      <button
        type="button"
        onClick={onLocationClick}
        className="
          flex
          h-12
          w-72
          items-center
          justify-between
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          shadow-sm
          transition-all
          duration-200
          hover:border-blue-500
          hover:shadow-md
        "
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <FaMapMarkerAlt className="text-lg text-blue-600 flex-shrink-0" />

          <div className="overflow-hidden text-left">
            <p className="truncate text-sm font-semibold text-gray-800">
              {location}
            </p>

            <p className="text-xs text-gray-500">Change Location</p>
          </div>
        </div>

        <FaChevronDown
          className={`
            text-gray-500
            transition-transform
            duration-200
            ${isLocationOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Search */}

      {showSearch && (
        <div className="flex-1 min-w-[280px]">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search services..."
          />
        </div>
      )}

      {/* Category */}

      {showCategory && (
        <div className="w-56">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
      )}

      {/* Sort */}
      {showSort && (
        <div className="w-48">
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      )}
    </div>
  );
};

export default ServiceSearchHeader;
