const { UPDATE_USER, GET_USER_INFO } = require(`../../../src/users/endpoints`);
const { GET_EXAM_INFO } = require(`../../../src/exams/endpoints`);
const { GET_ALL_QUESTIONS } = require(`../../../src/questions/endpoints`);
const { SUBMIT_ANSWER, GET_GRADE } = require(`../../../src/answers/endpoints`);

module.exports = [
  UPDATE_USER,
  GET_USER_INFO,
  GET_EXAM_INFO,
  GET_ALL_QUESTIONS,
  SUBMIT_ANSWER,
  GET_GRADE,
];
