const {
  addNewExamHandler,
  getAllExamsHandler,
  updateExamHandler,
  getExamInfoHandler,
  deleteExamHandler,
} = require("../controller/examController");

const router = require(`express`).Router();

const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const { GET_ALL_EXAMS } = require("../endpoints");

router.post(`/api/v1/exams/:id`, addNewExamHandler);
router.get(`/api/v1/exams`, isAuthorized(GET_ALL_EXAMS), getAllExamsHandler);
router.get(`/api/v1/exams/:id`, getExamInfoHandler);
router.patch(`/api/v1/exams/:id`, updateExamHandler);
router.delete(`/api/v1/exams/:id`, deleteExamHandler);

module.exports = router;
