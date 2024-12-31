const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      console.log("Error is ", error.message);
      res.status(error.status || 500).json({
        message: error.message,
        success: false,
      });
    }
  };
};

export default asyncHandler;
