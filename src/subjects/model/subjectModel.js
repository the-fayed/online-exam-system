const subjectSchema = require(`../schema/subjectSchema`);
const mongoose  = require("mongoose");


const subject = new mongoose.model(`subject`, subjectSchema);

module.exports = subject;