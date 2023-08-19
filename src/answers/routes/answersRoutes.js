const {
  submitAnswersHandler,
  compareStudentAnswerWithRightAnswer,
} = require("../controller/answersController");

const router = require(`express`).Router();

const validate = require(`../../../common/middleware/validationRequest`);
const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const validateAnswerSchema = require("../joi/answerValidation");
const { SUBMIT_ANSWER, GET_GRADE } = require("../endpoints");

router.post(
  `/api/v1/answers/:questionId/:studentId`,
  isAuthorized(SUBMIT_ANSWER),
  validate(validateAnswerSchema),
  submitAnswersHandler
);
router.get(
  `/api/v1/answers/:examId/:studentId`,
  isAuthorized(GET_GRADE),
  compareStudentAnswerWithRightAnswer
);

module.exports = router;
