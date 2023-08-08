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
      min: 2,
      max: 4,
    },
    rightAnswer: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3],
      min: 1,
      max: 1,
    },
  },
  { timestamps: true }
);

module.exports = questionsSchema;
