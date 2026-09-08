// utils/apiResponse.js

// Custom Response Class for Standardized API Responses
class apiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;  // HTTP status code (e.g., 200, 201, 400)
    this.data = data;              // Actual response data (user info, token, etc.)
    this.message = message;        // Optional message like "User created successfully"
    this.success = statusCode < 400; // True if status code < 400, else false
  }
}

export default apiResponse;
