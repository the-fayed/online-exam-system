const roles = require(`../../enum/roles`);
const adminPolicy = require(`./adminPolicy`);
const professorPolicy = require(`./professorPolicy`);
const studentPolicy = require(`./studentPolicy`);

const opts = {
  [roles.ADMIN]: {
    can: adminPolicy,
  },
  [roles.PROFESSOR]: {
    can: professorPolicy,
  },
  [roles.STUDENT]: {
    can: studentPolicy,
  },
};

module.exports = opts;
