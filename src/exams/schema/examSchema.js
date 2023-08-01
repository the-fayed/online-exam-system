const { Schema } = require("mongoose");

const examSchema = new Schema(
  {
    subject: {
      type: Schema.Types.ObjectId,
      ref: `subject`,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = examSchema;
