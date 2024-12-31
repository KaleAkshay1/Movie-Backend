class ApiError extends Error {
  constructor(status = 500, message = "something went wrong", error = []) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
}

export default ApiError;
