const {
  addDepartmentHandler,
  updateDepartmentHandler,
  getAllDepartmentsHandler,
  deleteDepartmentHandler,
  getDepartmentInfoHandler,
} = require("../controller/departmentController");


const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const validate = require(`../../../common/middleware/validationRequest`);



const {
  ADD_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  GET_DEPARTMENT_INFO,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
} = require("../endpoints");
const addDepartmentSchema = require("../joi/validateDepartment");

const router = require(`express`).Router();

router.post(
  `/api/v1/departments`,
  isAuthorized(ADD_DEPARTMENT),
  validate(addDepartmentSchema),
  addDepartmentHandler
);
router.get(
  `/api/v1/departments`,
  isAuthorized(GET_ALL_DEPARTMENTS),
  getAllDepartmentsHandler
);
router.get(
  `/api/v1/departments/:id`,
  isAuthorized(GET_DEPARTMENT_INFO),
  getDepartmentInfoHandler
);
router.patch(
  `/api/v1/departments/:id`,
  isAuthorized(UPDATE_DEPARTMENT),
  updateDepartmentHandler
);
router.delete(
  `/api/v1/departments/:id`,
  isAuthorized(DELETE_DEPARTMENT),
  deleteDepartmentHandler
);

module.exports = router;
