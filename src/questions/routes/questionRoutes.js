const {
  getAllQuestionsHandler,
  addNewQuestionHandler,
  updateQuestionHandler,
  deleteQuestionHandler,
} = require("../controller/questionsController");

const router = require(`express`).Router();

router.get(`/api/v1/questions/:examId`, getAllQuestionsHandler);
router.post(`/api/v1/questions/:examId`, addNewQuestionHandler);
router.patch(`/api/v1/questions/:examId/:questionId`, updateQuestionHandler);
router.delete(`/api/v1/questions/:examId/:questionId`, deleteQuestionHandler);

module.exports = router;
