const Joi = require(`joi`);

const addNewLevelSchema = Joi.object().keys({
  levelName: Joi.string().min(3).max(15).required(),
  department: Joi.string().id().required(),
});

const updateLevelSchema = Joi.object().keys({
  levelName: Joi.string().min(3).max(15).optional(),
  department: Joi.string().id().optional(),
});

module.exports = {
  addNewLevelSchema,
  updateLevelSchema,
};
