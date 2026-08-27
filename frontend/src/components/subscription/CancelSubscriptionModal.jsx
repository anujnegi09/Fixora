import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import Button from "../common/Button";

const CancelSubscriptionModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/40
        px-4
        backdrop-blur-md
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full max-w-md
          overflow-hidden
          rounded-2xl
          border border-white/20
          bg-white
          shadow-2xl
          animate-[scaleIn_0.2s_ease-out]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            absolute right-4 top-4
            flex h-9 w-9
            items-center justify-center
            rounded-full
            text-gray-400
            transition
            hover:bg-gray-100
            hover:text-gray-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          aria-label="Close"
        >
          <FaTimes size={15} />
        </button>

        {/* Content */}

        <div className="px-6 pb-6 pt-8 sm:px-8">
          {/* Warning Icon */}

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <FaExclamationTriangle
              className="text-red-500"
              size={22}
            />
          </div>

          {/* Heading */}

          <div className="mt-5 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Cancel Subscription?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Are you sure you want to cancel your Fixora subscription?
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              You may lose access to provider features after your
              subscription ends.
            </p>
          </div>

          {/* Actions */}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                w-full
                rounded-xl
                border border-gray-200
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-gray-700
                transition
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              Keep Subscription
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-600
                px-5 py-3
                text-sm font-semibold
                text-white
                transition
                hover:bg-red-700
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              {loading ? (
                <>
                  <span
                    className="
                      h-4 w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />

                  Cancelling...
                </>
              ) : (
                "Cancel Subscription"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscriptionModal;