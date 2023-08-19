const Joi = require(`joi`);

const addNewQuestionSchema = Joi.object().keys({
  question: Joi.string().required(),
  options: Joi.array().required(),
  rightAnswer: Joi.number().max(3).required(),
});

const updateQuestionSchema = Joi.object().keys({
  questionTxt: Joi.string().optional(),
  options: Joi.array().optional(),
  rightAnswer: Joi.number().optional(),
});

module.exports = {
  addNewQuestionSchema,
  updateQuestionSchema,
};
