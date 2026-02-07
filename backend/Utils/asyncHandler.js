/**
 * asyncHandler(fn)
 * ----------------
 * 👉 Purpose:
 * This utility wraps all your async route handlers (controllers)
 * so you don't have to write try/catch blocks in every controller.
 *
 * 🧠 Why we use it:
 * - Prevents server crashes from unhandled async errors.
 * - Keeps controllers clean and readable (no repeated try/catch).
 * - Ensures all errors are caught and sent as JSON responses.
 *
 * ⚙️ How it works:
 * - Takes a function (fn) — your controller.
 * - Executes it safely inside Promise.resolve().
 * - If an error occurs, .catch() handles it and returns a proper response.
 *
 * ✅ Example use:
 *   router.get("/profile", asyncHandler(getUserProfile));
 */

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  });
};
