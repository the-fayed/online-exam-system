const { StatusCodes } = require("http-status-codes");


module.exports = (schema) => {
  return async (req, res, next) => {
    try {
        const validationResults = await schema.validateAsync(req.body); 
        next();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({message: `Validation Error!`, error: error.details[0].message});
    }
  }
}