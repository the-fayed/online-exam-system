const {
  addNewExamHandler,
  getAllExamsHandler,
} = require("../controller/examController");

const router = require(`express`).Router();

const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const { GET_ALL_EXAMS } = require("../endpoints");

router.post(`/api/v1/exams/:id`, addNewExamHandler);
router.get(`/api/v1/exams`, isAuthorized(GET_ALL_EXAMS), getAllExamsHandler);

module.exports = router;
