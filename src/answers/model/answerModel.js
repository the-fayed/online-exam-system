const mongoose = require(`mongoose`);
const answerSchema = require(`../schema/answersSchema`);

const answers = mongoose.model(`answers`, answerSchema);

module.exports = answers;
