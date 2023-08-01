const {
  addNewLevelHandler,
  getAllLevelsHandler,
  getLevelInfoHandler,
  updateLevelHandler,
  deleteLevelHandler,
} = require("../controller/levelsController");

const {
  addNewLevelSchema,
  updateLevelSchema,
} = require(`../joi/levelsValidation`);

const router = require(`express`).Router();

const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const validate = require(`../../../common/middleware/validationRequest`);

router.post(`/api/v1/levels`, validate(addNewLevelSchema), addNewLevelHandler);
router.get(`/api/v1/levels`, getAllLevelsHandler);
router.get(`/api/v1/levels/:id`, getLevelInfoHandler);
router.patch(
  `/api/v1/levels/:id`,
  validate(updateLevelSchema),
  updateLevelHandler
);
router.delete(`/api/v1/levels/:id`, deleteLevelHandler);

module.exports = router;
