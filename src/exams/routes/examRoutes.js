const {
  addNewExamHandler,
  getAllExamsHandler,
  updateExamHandler,
  getExamInfoHandler,
  deleteExamHandler,
} = require("../controller/examController");

const router = require(`express`).Router();

const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const {
  GET_ALL_EXAMS,
  ADD_NEW_EXAM,
  GET_EXAM_INFO,
  UPDATE_EXAM,
  DELETE_EXAM,
} = require("../endpoints");

const validate = require(`../../../common/middleware/validationRequest`);
const { addExamSchema, updateExamSchema } = require(`../joi/examValidation`);

router.post(
  `/api/v1/exams/:id`,
  isAuthorized(ADD_NEW_EXAM),
  validate(addExamSchema),
  addNewExamHandler
);
router.get(`/api/v1/exams`, isAuthorized(GET_ALL_EXAMS), getAllExamsHandler);
router.get(
  `/api/v1/exams/:id`,
  isAuthorized(GET_EXAM_INFO),
  getExamInfoHandler
);
router.patch(
  `/api/v1/exams/:id`,
  isAuthorized(UPDATE_EXAM),
  validate(updateExamSchema),
  updateExamHandler
);
router.delete(
  `/api/v1/exams/:id`,
  isAuthorized(DELETE_EXAM),
  deleteExamHandler
);

module.exports = router;
