const { validationResult, validationChain } = require(`express-validator`);
const { StatusCodes } = require("http-status-codes");

const validationRequest = (validations) => {
  return async (req, res, next) => {
    try {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) {
          break;
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          return next();
        }
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Validation error!`, error: error });
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal server error!`, error: error });
      console.log(error);
    }
  };
};

module.exports = validationRequest;
