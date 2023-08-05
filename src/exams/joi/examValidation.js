const Joi = require(`joi`);

const addExamSchema = Joi.object().keys({
  title: Joi.string().min(5).max(40).required(),
  duration: Joi.number().required(),
  date: Joi.date().required(),
});

const updateExamSchema = Joi.object().keys({
  title: Joi.string().min(5).max(40).optional(),
  duration: Joi.number().optional(),
  date: Joi.date().optional(),
});

module.exports = {
  addExamSchema,
  updateExamSchema,
};
