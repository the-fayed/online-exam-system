const {
  addUserHandler,
  getAllUsersHandler,
  updateUserHandler,
  deleteUserHandler,
  signUpHandler,
  loginHandler,
  verifyEmailHandler,
  getUserInfoHandler,
} = require("../controller/userController");

const router = require(`express`).Router();

const validateRequest = require(`../../../common/middleware/validationRequest`);

const isAuthorized = require(`../../../common/middleware/isAuthorized`);

const {
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
  signUpSchema,
} = require("../express-validator/validationSchema");
const { ADD_USER, UPDATE_USER, DELETE_USER } = require("../endpoints");

router.post(
  `/api/v1/users`,
  isAuthorized(ADD_USER),
  validateRequest(addUserSchema),
  addUserHandler
);
router.get(`/api/v1/users`, getAllUsersHandler);
router.get(`/api/v1/users/:id`, getUserInfoHandler);
router.patch(
  `/api/v1/users/:id`,
  isAuthorized(UPDATE_USER),
  validateRequest(updateUserSchema),
  updateUserHandler
);
router.delete(
  `/api/v1/users/:id`,
  isAuthorized(DELETE_USER),
  validateRequest(deleteUserSchema),
  deleteUserHandler
);

router.post(`/api/v1/signup`, validateRequest(signUpSchema), signUpHandler);
router.get(`/api/v1/users/:id/verify/:token`, verifyEmailHandler);
router.post(`/api/v1/auth`, loginHandler);
module.exports = router;
