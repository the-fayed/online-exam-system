const { Schema } = require("mongoose");

const levelsSchema = new Schema(
  {
    levelName: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: `department`,
      required: true,
    },
    studentsCodes: [
      {
        type: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = levelsSchema;

levelsSchema.pre(`save`, async function (next) {
  this.levelName =
    this.levelName.charAt(0).toUpperCase() + this.levelName.slice(1);
  next();
});

levelsSchema.pre([`update`, `findOneAndUpdate`], async function (next) {
  const updatedObj = this.getUpdate();
  if (`levelName` in updatedObj) {
    const capitalizedName =
      updatedObj.levelName.charAt(0).toUpperCase() +
      updatedObj.levelName.slice(1);
    updatedObj.levelName = capitalizedName;
    next();
  }
});
