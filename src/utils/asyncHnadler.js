// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req,res,next)
//   } catch (error) {
//     res.status(err.code).json({
//       success: false,                    // try and catch method code
//       message: err.message,
//     });
//   }
// };

const asyncHandler = () => {
  (req, res, next) => {
    Promise.resolve(asyncHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
