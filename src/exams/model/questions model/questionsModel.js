const questionSchema = require(`../../schema/questions schema/questionsSchema`);

const mongoose = require(`mongoose`);

const questions = mongoose.model(`questions`, questionSchema);

module.exports = questions;
