const { Schema } = require(`mongoose`);

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: `user`,
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = tokenSchema;
