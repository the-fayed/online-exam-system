const questionsSchema = require(`../schema/questionsSchema`);

const mongoose = require(`mongoose`);

const question = mongoose.model(`question`, questionsSchema);

module.exports = question;
