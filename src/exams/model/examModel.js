const examSchema = require(`../schema/examSchema`);

const mongoose = require(`mongoose`);

const exam = mongoose.model(`exam`, examSchema);

module.exports = exam;
