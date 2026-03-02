// Custom error class to create structured API errors
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);           // sets error message
    this.statusCode = statusCode; // HTTP status code
    this.name = "APIError";   // custom error type
  }
}


// Wrapper to handle async errors automatically
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


// Global error handling middleware
const globalErrorhandler = (err, req, res, next) => {
  console.error(err.stack); // log error for debugging

  // Handle custom API errors
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Validation Error",
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};

module.exports = { APIError, asyncHandler, globalErrorhandler };