const {
  getAllQuestionsHandler,
  addNewQuestionHandler,
} = require("../controller/questionsController");

const router = require(`express`).Router();

router.get(`/api/v1/questions/:id`, getAllQuestionsHandler);
router.post(`/api/v1/questions/:id`, addNewQuestionHandler);

module.exports = router;
