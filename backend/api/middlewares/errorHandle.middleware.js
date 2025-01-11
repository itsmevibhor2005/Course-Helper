// errorHandle.middleware.js
import { ApiErrors } from "../utils/ApiError.js"; // Import your custom error class

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiErrors) {
    // Handle custom API errors
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }

  // Handle generic errors
  console.error("Unhandled error:", err.stack || err.message); // Optional: Log the error for debugging
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: [],
  });
};

export default errorHandler;
