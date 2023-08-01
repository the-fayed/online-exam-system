const {
  ADD_USER,
  UPDATE_USER,
  GET_ALL_USERS,
  GET_USER_INFO,
  DELETE_USER,
} = require("../../../src/users/endpoints");

const {
  ADD_SUBJECT,
  GET_ALL_SUBJECTS,
  GET_SUBJECT_INFO,
  DELETE_SUBJECT,
  UPDATE_SUBJECT,
} = require(`../../../src/subjects/endpoints`);

const {
  ADD_DEPARTMENT,
  UPDATE_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  GET_DEPARTMENT_INFO,
  DELETE_DEPARTMENT,
} = require(`../../../src/department/endpoints`);

const {
  ADD_NEW_LEVEL,
  GET_ALL_LEVELS,
  GET_LEVEL_INFO,
  UPDATE_LEVEL,
  DELETE_LEVEL,
} = require(`../../../src/levels/endpoints`);

const { GET_ALL_EXAMS } = require(`../../../src/exams/endpoints`);

module.exports = [
  ADD_USER,
  UPDATE_USER,
  GET_ALL_USERS,
  GET_USER_INFO,
  DELETE_USER,
  ADD_SUBJECT,
  GET_ALL_SUBJECTS,
  GET_SUBJECT_INFO,
  DELETE_SUBJECT,
  UPDATE_SUBJECT,
  ADD_DEPARTMENT,
  UPDATE_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  GET_DEPARTMENT_INFO,
  DELETE_DEPARTMENT,
  ADD_NEW_LEVEL,
  GET_ALL_LEVELS,
  GET_LEVEL_INFO,
  UPDATE_LEVEL,
  DELETE_LEVEL,
  GET_ALL_EXAMS,
];
