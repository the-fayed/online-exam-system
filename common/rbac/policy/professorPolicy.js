const { UPDATE_USER, GET_USER_INFO } = require(`../../../src/users/endpoints`);

const {
  ADD_SUBJECT,
  GET_ALL_SUBJECTS,
  GET_SUBJECT_INFO,
  DELETE_SUBJECT,
} = require(`../../../src/subjects/endpoints`);

const {
  GET_ALL_DEPARTMENTS,
  GET_DEPARTMENT_INFO,
} = require(`../../../src/department/endpoints`);

const {
  GET_ALL_LEVELS,
  GET_LEVEL_INFO,
} = require(`../../../src/levels/endpoints`);

const { GET_ALL_EXAMS } = require(`../../../src/exams/endpoints`);

module.exports = [
  UPDATE_USER,
  GET_USER_INFO,
  ADD_SUBJECT,
  GET_ALL_SUBJECTS,
  GET_SUBJECT_INFO,
  DELETE_SUBJECT,
  GET_ALL_DEPARTMENTS,
  GET_DEPARTMENT_INFO,
  GET_ALL_LEVELS,
  GET_LEVEL_INFO,
  GET_ALL_EXAMS,
];
