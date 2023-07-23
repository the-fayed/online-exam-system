const RBAC = require(`easy-rbac`);
const opts = require(`./policy`);

const rbac = RBAC.create(opts);

module.exports = rbac;
