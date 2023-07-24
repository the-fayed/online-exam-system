const jwt = require(`jsonwebtoken`);
const User = require("../../src/users/model/userModel");
const { StatusCodes } = require("http-status-codes");
const rbac = require("../rbac/rbac");

module.exports = (endpoint) => {
  return async (req, res, next) => {
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(` `)[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
          res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: `Unauthorized!` });
        } else {
          req.user = user;
          const isAuthorized = await rbac.can(user.role, endpoint);
          if (isAuthorized) {
            next();
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ message: `Unauthorized!` });
          }
        }
      } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error!`, error });
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: `Unauthorized!` });
    }
  };
};
