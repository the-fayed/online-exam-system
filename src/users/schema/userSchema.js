const { Schema } = require("mongoose");
const bcrypt = require(`bcrypt`);

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [`admin`, `professor`, `student`],
      default: `student`,
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: `level`,
      required: function () {
        return this.role == `student`;
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;

// hook to hash password pre save

userSchema.pre(`save`, async function (next) {
  this.password = await bcrypt.hash(this.password, 9);
  next();
});

// hook to hash password pre update:

userSchema.pre(`updateOne`, async function () {
  const userUpdate = this.getUpdate();

  if (`password` in userUpdate) {
    const hashedPassword = await bcrypt.hash(userUpdate.password, 9);
    userUpdate.password = hashedPassword;
  }
});
