const Joi = require(`joi`);


const addSubjectSchema = Joi.object().keys({
    subjectName: Joi.string().min(5).max(30).required(),
    subjectCode: Joi.string().min(5).max(6).required(),
    teachBy: Joi.string().id().required(),
});

module.exports = {
    addSubjectSchema,
};