const mongoose = require(`mongoose`);
const departmentSchema = require(`../schema/departmentSchema`);

const department = mongoose.model(`department`, departmentSchema);

module.exports = department;