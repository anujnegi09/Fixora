// utils/apiError.js

// Custom Error Class for Handling API Errors
class apiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message); // Call parent Error constructor

    // Custom fields
    this.statusCode = statusCode; // HTTP status code (e.g., 400, 404, 500)
    this.data = null;             // You can attach extra data if needed
    this.message = message;       // Error message
    this.success = false;         // Always false for errors
    this.errors = errors;         // Optional array of detailed errors

    // Maintain proper stack trace (for debugging)
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default apiError;
