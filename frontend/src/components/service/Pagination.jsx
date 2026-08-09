import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-2 border rounded-lg disabled:opacity-50"
      >
        <FaAngleLeft />
      </button>

      {/* Page Numbers */}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg border transition
            ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-2 border rounded-lg disabled:opacity-50"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
