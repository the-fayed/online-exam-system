const { StatusCodes } = require("http-status-codes");
const Subject = require(`../model/subjectModel`);
const User = require("../../users/model/userModel");
const paginationService = require(`../../../common/services/paginationService`);

exports.addSubjectHandler = async (req, res) => {
  const { subjectName, subjectCode, teachBy, subjectDescription, level } =
    req.body;
  try {
    const exist = await Subject.findOne({
      subjectCode: subjectCode.toUpperCase(),
    });
    if (exist) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Subject already exist!` });
    } else {
      const subject = await Subject.create({
        subjectName,
        subjectCode,
        teachBy,
        subjectDescription,
        level,
      });
      res.status(StatusCodes.CREATED).json({
        message: `${subjectName} created successfully!`,
        data: subject,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.getAllSubjectsHandler = async (req, res) => {
  const { id } = req.params;
  const { page, size } = req.query;
  const { limit, skip } = paginationService(page, size);
  try {
    const user = await User.findOne({ _id: id }).skip(skip).limit(limit);
    let subjectsCount = 0;
    if (user.role == `professor` && user.verified == true) {
      const subjects = await Subject.find({ teachBy: id })
        .populate({
          path: `subject`,
          populate: {
            path: `level`,
            select: `levelName`,
            populate: {
              path: `department`,
              select: `departmentName`,
            },
          },
        })
        .select(`-teachBy`);
      for (let subject in subjects) {
        subjectsCount++;
      }
      res.status(StatusCodes.OK).json({
        message: `${user.userName}'s subjects`,
        subjectsCount: subjectsCount,
        data: subjects,
      });
    } else if (user.role == `admin`) {
      const subjects = await Subject.find().populate({
        path: `subject`,
        populate: {
          path: `level`,
          select: `levelName`,
          populate: {
            path: `department`,
            select: `departmentName`,
          },
        },
      });
      for (let subject in subjects) {
        subjectsCount++;
      }
      res.status(StatusCodes.OK).json({
        message: `Subjects`,
        subjectsCount: subjectsCount,
        data: subjects,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.getSubjectInfoHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const subject = await Subject.findOne({ _id: id }).populate({
      path: `subject`,
      populate: {
        path: `level`,
        select: `levelName`,
        populate: {
          path: `department`,
          select: `departmentName`,
        },
      },
    });
    if (subject) {
      res
        .status(StatusCodes.OK)
        .json({ message: `${subject.subjectName}`, data: subject });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Something went wrong, please try again later!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.updateSubjectHandler = async (req, res) => {
  const { subjectName, subjectDescription } = req.body;
  const { id } = req.params;
  try {
    const subject = await Subject.findOneAndUpdate(
      { _id: id },
      {
        subjectName,
        subjectDescription,
      },
      { new: true }
    );
    if (subject) {
      res.status(StatusCodes.ACCEPTED).json({
        message: `${subject.subjectName} updated successfully!`,
        data: subject,
      });
    } else {
      res
        .status(StatusCodes.NOT_MODIFIED)
        .json({ message: `Error while updating!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.deleteSubjectHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const subject = await Subject.findOne({ _id: id });
    if (subject) {
      const deleted = await Subject.deleteOne({ _id: id });
      if (deleted.deletedCount > 0) {
        res
          .status(StatusCodes.OK)
          .json({ message: `${subject.subjectName} deleted successfully` });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Something went wrong, please try again later!` });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Subject not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};
