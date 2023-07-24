const { UPDATE_USER, GET_USER_INFO } = require(`../../../src/users/endpoints`);

const {
    ADD_SUBJECT,
    GET_ALL_SUBJECTS,
    GET_SUBJECT_INFO,
    DELETE_SUBJECT
  } = require(`../../../src/subjects/endpoints`);

module.exports = [
    UPDATE_USER,
    GET_USER_INFO,
    ADD_SUBJECT,
    GET_ALL_SUBJECTS,
    GET_SUBJECT_INFO,
    DELETE_SUBJECT
];
