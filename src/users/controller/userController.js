const { StatusCodes } = require("http-status-codes");
const User = require(`../model/userModel`);
const Department = require(`../../department/model/departmentModel`);
const Level = require(`../../levels/model/levelsModel`);
const crypto = require(`crypto`);
const Token = require(`../model/tokenModel`);
const sendEmail = require(`../../../common/services/sendEmail`);
const userVerificationTemplate = require(`../../../common/services/userVerificationTemplate`);
const paginationService = require(`../../../common/services/paginationService`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

exports.addUserHandler = async (req, res) => {
  const { userName, email, password, role, verified } = req.body;
  try {
    const emailExists = await User.findOne({ email });
    const userNameExists = await User.findOne({ userName });
    if (emailExists) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Email already exist!` });
    } else if (userNameExists) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Username is already taken!` });
    } else {
      const user = await User.create({
        userName,
        email,
        password,
        role,
        verified,
      });
      res.status(StatusCodes.CREATED).json({
        message: `${userName}'s account created successfully!`,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.getAllUsersHandler = async (req, res) => {
  const { page, size } = req.query;
  const { skip, limit } = paginationService(page, size);
  try {
    let numberOfUsers = 0;
    const users = await User.find().skip(skip).limit(limit).select(`-password`);
    for (let user of users) {
      numberOfUsers++;
    }
    res
      .status(StatusCodes.OK)
      .json({ message: `Success!`, numberOfUsers: numberOfUsers, data: users });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
  }
};

exports.getUserInfoHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).select(`-password`);
    if (user) {
      res
        .status(StatusCodes.OK)
        .json({ message: `${user.userName}'s profile!`, data: user });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `User not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
  }
};

exports.updateUserHandler = async (req, res) => {
  const { userName, password } = req.body;
  const { id } = req.params;
  try {
    const userNameExists = await User.findOne({ userName });
    if (userNameExists) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `User name is already taken!` });
    }
    const user = await User.updateOne(
      { _id: id },
      {
        userName,
        password,
      },
      { new: true }
    );
    if (user.modifiedCount > 0) {
      res.status(StatusCodes.OK).json({ message: `Updated successfully!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      const deletedUser = await User.deleteOne({ _id: id });
      if (deletedUser.deletedCount > 0) {
        res
          .status(StatusCodes.OK)
          .json({ message: `Deleted Successfully!`, data: id });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Something went wrong!` });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.signUpHandler = async (req, res) => {
  const { userName, email, password, role, studentCode } = req.body;
  try {
    const emailExists = await User.findOne({ email });
    const userNameExists = await User.findOne({ userName });
    const level = await Level.findOne({ studentsCodes: studentCode });
    if (emailExists) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Email already exist!` });
    } else if (userNameExists) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Username is already taken!` });
    } else {
      const user = await User.create({
        userName,
        email,
        password,
        role,
        level: level._id,
      });
      const token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString(`hex`),
      });
      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token}`;
      await sendEmail(
        user.email,
        `Email Verification`,
        userVerificationTemplate(url)
      );
      res.status(StatusCodes.CREATED).json({
        message: `${userName}'s account created successfully, please check your email inbox to verify your email!`,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Email Invalid!` });
    } else if (!user.verified) {
      const token = await Token.findOne({ userId: user._id });
      if (!token) {
        const token = await Token.create({
          userId: user._id,
          token: crypto.randomBytes(32).toString(`hex`),
        });
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token}`;
        await sendEmail(
          user.email,
          `Email verification`,
          userVerificationTemplate(url)
        );
        res.status(StatusCodes.OK).json({
          message: `A verification email was sent to you, please check your email!`,
        });
      } else if (token) {
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token}`;
        await sendEmail(
          user.email,
          `Email verification`,
          userVerificationTemplate(url)
        );
        res.status(StatusCodes.OK).json({
          message: `A verification email was sent to you, please check your email!`,
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `An expected error, please try again later!` });
      }
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const loginToken = jwt.sign(
          {
            id: user._id,
            role: user.role,
            verified: user.verified,
          },
          process.env.SECRET_KEY,
          { expiresIn: process.env.EXPIRATION_PERIOD }
        );
        res
          .status(StatusCodes.OK)
          .json({ message: `Login success!`, loginToken, data: user });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Invalid password!` });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
    console.log(error);
  }
};

exports.verifyEmailHandler = async (req, res) => {
  const { id, token } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Invalid link!` });
    }
    const userToken = await Token.findOne({ userId: id, token: token });
    if (!token) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Invalid link!` });
    }
    await User.updateOne({ _id: id }, { verified: true });
    await Token.deleteOne({ userId: id });
    res
      .status(StatusCodes.OK)
      .json({ message: `Email verified successfully!` });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
  }
};
