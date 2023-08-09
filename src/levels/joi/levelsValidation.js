const Joi = require(`joi`);

const addNewLevelSchema = Joi.object().keys({
  levelName: Joi.string().min(3).max(15).required(),
  department: Joi.string().id().required(),
  studentsCodes: Joi.array(),
});

const updateLevelSchema = Joi.object().keys({
  levelName: Joi.string().min(3).max(15).optional(),
  department: Joi.string().id().optional(),
  studentsCodes: Joi.array(),
});

module.exports = {
  addNewLevelSchema,
  updateLevelSchema,
};
