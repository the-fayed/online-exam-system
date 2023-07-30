const { StatusCodes } = require("http-status-codes");


module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      try {
        const validationResults = await schema.validateAsync(req.body);
        next()
      } catch (error) {
        return res.status(StatusCodes.FORBIDDEN).json({message: `Validation error!`, error: error});
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `Internal server error!`, error: error});
    }
  }
}