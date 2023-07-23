const { body, param } = require("express-validator");

const addUserSchema = [
  body(`userName`)
    .not()
    .isEmpty()
    .withMessage(`User Name is required!`)
    .isString()
    .withMessage(`User name must be a string!`),
  body(`email`)
    .not()
    .isEmpty()
    .withMessage(`Email is required!`)
    .isEmail()
    .withMessage(`Invalid email!`),
  body(`password`)
    .not()
    .isEmpty()
    .withMessage(`Password is required!`)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 6,
      minUppercase: 1,
    })
    .withMessage(
      `Password must contain an uppercase character, a lowercase character, and 8 numbers at least!`
    ),
  body(`role`)
    .not()
    .isEmpty()
    .withMessage(`Role is required!`)
    .isIn([`admin`, `professor`, `student`])
    .withMessage(`Invalid role!`),
  body(`verified`)
    .not()
    .isEmpty()
    .withMessage(`verified section is required!`)
    .isBoolean()
    .withMessage(`Verified section must be a boolean value!`),
];

const updateUserSchema = [
  param(`id`)
    .not()
    .isEmpty()
    .withMessage(`Invalid userId!`)
    .isMongoId()
    .withMessage(`Invalid userId!`),
  body(`userName`)
    .not()
    .isString()
    .withMessage(`User name must be a sting!`)
    .optional(),
  body(`password`)
    .not()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 6,
      minUppercase: 1,
    })
    .withMessage(
      `Password must contain an uppercase character, a lowercase character, and 8 numbers at least!`
    ),
];

const deleteUserSchema = [
  param(`id`)
    .not()
    .isEmpty()
    .withMessage(`UserId is required!`)
    .isMongoId()
    .withMessage(`Invalid userId!`),
];

const signUpSchema = [
  body(`userName`)
    .not()
    .isEmpty()
    .withMessage(`User Name is required!`)
    .isString()
    .withMessage(`User name must be a string!`),
  body(`email`)
    .not()
    .isEmpty()
    .withMessage(`Email is required!`)
    .isEmail()
    .withMessage(`Invalid email!`),
  body(`password`)
    .not()
    .isEmpty()
    .withMessage(`Password is required!`)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 6,
      minUppercase: 1,
    })
    .withMessage(
      `Password must contain an uppercase character, a lowercase character, and 8 numbers at least!`
    ),
  body(`role`)
    .not()
    .isEmpty()
    .withMessage(`Role is required!`)
    .isIn([`professor`, `student`])
    .withMessage(`Invalid role!`),
];

module.exports = {
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
  signUpSchema,
};
