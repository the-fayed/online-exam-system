const {
  addSubjectHandler,
  getAllSubjectsHandler,
  deleteSubjectHandler,
  getSubjectInfoHandler,
  updateSubjectHandler,
} = require("../controller/subjectController");

const router = require(`express`).Router();

const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const {
  ADD_SUBJECT,
  GET_ALL_SUBJECTS,
  DELETE_SUBJECT,
  GET_SUBJECT_INFO,
  UPDATE_SUBJECT,
} = require("../endpoints");
const validationRequest = require(`../../../common/middleware/validationRequest`);
const {
  addSubjectSchema,
  updateSubjectSchema,
} = require("../joi/subjectValidation");

router.post(
  `/api/v1/subjects`,
  isAuthorized(ADD_SUBJECT),
  validationRequest(addSubjectSchema),
  addSubjectHandler
);
router.patch(
  `/api/v1/subjects/:id`,
  isAuthorized(UPDATE_SUBJECT),
  validationRequest(updateSubjectSchema),
  updateSubjectHandler
);
router.get(
  `/api/v1/subjects/:id`,
  isAuthorized(GET_ALL_SUBJECTS),
  getAllSubjectsHandler
);
router.delete(
  `/api/v1/subjects/:id`,
  isAuthorized(DELETE_SUBJECT),
  deleteSubjectHandler
);
router.get(
  `/api/v1/subjects`,
  isAuthorized(GET_SUBJECT_INFO),
  getSubjectInfoHandler
);

module.exports = router;
