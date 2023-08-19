const { Schema } = require("mongoose");

const answerSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: `questions`,
      required: true,
    },
    answer: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = answerSchema;
