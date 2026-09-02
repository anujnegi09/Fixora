import { FaTrash, FaTimes } from "react-icons/fa";

const ConfirmDeleteReviewModal = ({
  isOpen,
  review,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  if (!isOpen || !review) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FaTrash size={16} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Delete Review
              </h2>

              <p className="text-sm text-gray-500">
                Are you sure you want to delete this review?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            <FaTimes size={14} />
          </button>

        </div>

        {/* Review preview */}
        <div className="mt-5 rounded-xl bg-gray-50 p-4">

          <div className="flex items-center justify-between">

            <p className="text-sm font-semibold text-gray-700">
              {review.serviceId?.title ||
                review.service?.title ||
                "Service"}
            </p>

            <span className="text-sm font-semibold text-yellow-500">
              ★ {Number(review.rating || 0).toFixed(1)}
            </span>

          </div>

          {review.review && (
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
              "{review.review}"
            </p>
          )}

        </div>

        {/* Warning */}
        <p className="mt-4 text-xs leading-5 text-gray-400">
          This action cannot be undone. Your review will be permanently
          removed and the service rating will be recalculated.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex min-w-[110px] items-center justify-center rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete Review"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmDeleteReviewModal;