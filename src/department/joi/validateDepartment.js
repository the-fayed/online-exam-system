const Joi = require(`joi`);

const addDepartmentSchema = Joi.object().keys({
    departmentName: Joi.string().min(2).max(45).required()
});

module.exports = addDepartmentSchema;