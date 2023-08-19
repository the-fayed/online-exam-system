const {
  getAllQuestionsHandler,
  addNewQuestionHandler,
  updateQuestionHandler,
  deleteQuestionHandler,
} = require("../controller/questionsController");

const router = require(`express`).Router();
const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const isValid = require(`../../../common/middleware/validationRequest`);
const {
  GET_ALL_QUESTIONS,
  ADD_NEW_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} = require("../endpoints");

const {
  addNewQuestionSchema,
  updateQuestionSchema,
} = require(`../joi/questionValidation`);

router.get(
  `/api/v1/questions/:examId`,
  isAuthorized(GET_ALL_QUESTIONS),
  getAllQuestionsHandler
);
router.post(
  `/api/v1/questions/:examId`,
  isAuthorized(ADD_NEW_QUESTION),
  isValid(addNewQuestionSchema),
  addNewQuestionHandler
);
router.patch(
  `/api/v1/questions/:examId/:questionId`,
  isAuthorized(UPDATE_QUESTION),
  isValid(updateQuestionSchema),
  updateQuestionHandler
);
router.delete(
  `/api/v1/questions/:examId/:questionId`,
  isAuthorized(DELETE_QUESTION),
  deleteQuestionHandler
);

module.exports = router;
