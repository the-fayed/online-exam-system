const { Schema } = require("mongoose");

const questionsSchema = new Schema(
  {
    exam: {
      type: Schema.Types.ObjectId,
      ref: `exam`,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    rightAnswer: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3],
    },
  },
  { timestamps: true }
);

module.exports = questionsSchema;