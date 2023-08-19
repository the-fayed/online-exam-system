const Joi = require(`joi`);

const validateAnswerSchema = Joi.object().keys({
  answer: Joi.number().max(3).min(0).required(),
});

module.exports = validateAnswerSchema;
