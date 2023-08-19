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
      minLin: 1,
      maxLin: 1,
      max: 3,
    },
  },
  { timestamps: true }
);

module.exports = questionsSchema;
