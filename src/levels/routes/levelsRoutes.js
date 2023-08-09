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
const {
  ADD_NEW_LEVEL,
  GET_ALL_LEVELS,
  GET_LEVEL_INFO,
  UPDATE_LEVEL,
  DELETE_LEVEL,
} = require("../endpoints");

router.post(
  `/api/v1/levels`,
  isAuthorized(ADD_NEW_LEVEL),
  validate(addNewLevelSchema),
  addNewLevelHandler
);
router.get(`/api/v1/levels`, isAuthorized(GET_ALL_LEVELS), getAllLevelsHandler);
router.get(
  `/api/v1/levels/:id`,
  isAuthorized(GET_LEVEL_INFO),
  getLevelInfoHandler
);
router.patch(
  `/api/v1/levels/:id`,
  isAuthorized(UPDATE_LEVEL),
  validate(updateLevelSchema),
  updateLevelHandler
);
router.delete(
  `/api/v1/levels/:id`,
  isAuthorized(DELETE_LEVEL),
  deleteLevelHandler
);

module.exports = router;
