const mongoose = require(`mongoose`);
const userSchema = require("../schema/userSchema");

const user = mongoose.model(`user`, userSchema);

module.exports = user;
