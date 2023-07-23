const mongoose = require(`mongoose`);
const tokenSchema = require("../schema/tokenSchema");

const token = mongoose.model(`token`, tokenSchema);

module.exports = token;
