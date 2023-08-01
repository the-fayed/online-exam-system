const Joi = require(`joi`);

const addSubjectSchema = Joi.object().keys({
  subjectName: Joi.string().min(5).max(30).required(),
  subjectDescription: Joi.string().optional(),
  subjectCode: Joi.string().min(5).max(6).required(),
  teachBy: Joi.string().id().required(),
  department: Joi.string().id().required(),
  level: Joi.string().id().required(),
});

const updateSubjectSchema = Joi.object().keys({
  subjectName: Joi.string().min(5).max(30).optional(),
  subjectDescription: Joi.string().optional(),
});

module.exports = {
  addSubjectSchema,
  updateSubjectSchema,
};
