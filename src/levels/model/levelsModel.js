const mongoose = require("mongoose");
const levelsSchema = require(`../schema/levelsSchema`);

const level = mongoose.model(`level`, levelsSchema);

module.exports = level;
