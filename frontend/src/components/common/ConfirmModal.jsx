import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

const ConfirmModal = ({
title = "Are you sure?",
message = "This action cannot be undone.",
confirmText = "Confirm",
cancelText = "Cancel",
onConfirm,
onCancel,
loading = false,
}) => {
return ( <div
   className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
   onClick={onCancel}
 >
<div
className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
onClick={(e) => e.stopPropagation()}
>
{/* Header */} <div className="flex items-start justify-between"> <div className="flex items-center gap-3"> <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100"> <FaExclamationTriangle className="text-red-600" /> </div>

```
        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaTimes size={18} />
      </button>
    </div>

    {/* Message */}
    <p className="mt-5 text-sm leading-6 text-gray-600">
      {message}
    </p>

    {/* Buttons */}
    <div className="mt-7 flex justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {cancelText}
      </button>

      <button
        type="button"
        onClick={onConfirm}
        disabled={loading}
        className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Deleting..." : confirmText}
      </button>
    </div>
  </div>
</div>

);
};

export default ConfirmModal;
