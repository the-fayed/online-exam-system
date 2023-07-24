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
  DELETE_SUBJECT
} = require(`../../../src/subjects/endpoints`);


module.exports = [
  ADD_USER,
  UPDATE_USER,
  GET_ALL_USERS,
  GET_USER_INFO,
  DELETE_USER,
  ADD_SUBJECT,
  GET_ALL_SUBJECTS,
  GET_SUBJECT_INFO,
  DELETE_SUBJECT
];
