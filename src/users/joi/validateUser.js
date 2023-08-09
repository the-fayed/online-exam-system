const Joi = require(`joi`);

const addUserSchema = Joi.object().keys({
  userName: Joi.string().min(5).max(30).required(),
  email: Joi.string()
    .email({ maxDomainSegments: 2, tlds: { allow: [`com`, `net`] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/))
    .min(8)
    .required(),
  verified: Joi.boolean().required(),
  role: Joi.string().valid(`admin`, `student`, `professor`).required(),
  studentCode: Joi.alternatives().conditional(`role`, {
    is: `student`,
    then: Joi.number().required(),
  }),
});

const updateUserSchema = Joi.object().keys({
  userName: Joi.string().min(5).max(30).optional(),
  password: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/))
    .min(8)
    .required(),
});

const signUpSchema = Joi.object().keys({
  userName: Joi.string().min(5).max(30).required(),
  email: Joi.string()
    .email({ maxDomainSegments: 2, tlds: { allow: [`com`, `net`] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/))
    .min(8)
    .required(),
  role: Joi.any().invalid(`admin`).valid(`student`, `professor`).required(),
  studentCode: Joi.alternatives().conditional(`role`, {
    is: `student`,
    then: Joi.number().required(),
  }),
});

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ maxDomainSegments: 2, tlds: { allow: [`com`, `net`] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/))
    .min(8)
    .required(),
});

module.exports = {
  addUserSchema,
  updateUserSchema,
  signUpSchema,
  loginSchema,
};
