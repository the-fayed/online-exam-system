const {
  submitAnswersHandler,
  compareStudentAnswerWithRightAnswer,
} = require("../controller/answersController");

const router = require(`express`).Router();

router.post(`/api/v1/answers/:questionId/:studentId`, submitAnswersHandler);
router.get(
  `/api/v1/answers/:examId/:studentId`,
  compareStudentAnswerWithRightAnswer
);

module.exports = router;
