const { addSubjectHandler, getAllSubjectsHandler, deleteSubjectHandler, getSubjectInfoHandler } = require("../controller/subjectController");

const router = require(`express`).Router();

router.post(`/api/v1/subjects`, addSubjectHandler);
router.get(`/api/v1/subjects/:id`, getAllSubjectsHandler);
router.delete(`/api/v1/subjects/:id`, deleteSubjectHandler);
router.get(`/api/v1/subjects`, getSubjectInfoHandler);

module.exports = router;