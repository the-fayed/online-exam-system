const Joi = require(`joi`);

const addDepartmentSchema = Joi.object().keys({
    departmentName: Joi.string().min(2).max(45).required(),
    departmentDescription: Joi.string().optional(),
});

module.exports = addDepartmentSchema;