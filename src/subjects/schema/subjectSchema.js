const { Schema } = require("mongoose");

const subjectSchema = new Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    subjectDescription: {
      type: String,
      default: "",
    },
    subjectCode: {
      type: String,
      min: 5,
      max: 6,
      required: true,
    },
    teachBy: {
      type: Schema.Types.ObjectId,
      ref: `user`,
      required: true,
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: `level`,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = subjectSchema;

subjectSchema.pre(`save`, function (next) {
  this.subjectCode = this.subjectCode.toUpperCase();
  next();
});
