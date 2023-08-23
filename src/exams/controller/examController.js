const { StatusCodes } = require("http-status-codes");
const Exam = require(`../model/examModel`);
const paginationService = require("../../../common/services/paginationService");

exports.addNewExamHandler = async (req, res) => {
  const { id } = req.params;
  const { title, date, duration } = req.body;
  try {
    const exam = await Exam.create({
      subject: id,
      title,
      date,
      duration,
    });
    if (exam) {
      res
        .status(StatusCodes.CREATED)
        .json({ message: `Exam created successfully!`, data: exam });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Error while creating exam! please try again.` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.getAllExamsHandler = async (req, res) => {
  if (req.user.role == `professor`) {
    const { id, page, size } = req.query;
    const { limit, skip } = paginationService(page, size);
    try {
      let examsCount = 0;
      const exams = await Exam.find({ subject: id }).skip(skip).limit(limit);
      for (let exam in exams) {
        examsCount++;
      }
      if (exams) {
        res
          .status(StatusCodes.OK)
          .json({ message: `exams`, examsCount: examsCount, data: exams });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Error while getting exams!` });
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal server error!`, error: error });
      console.log(error);
    }
  } else if (req.user.role == `admin`) {
    try {
      let examsCount = 0;
      const exams = await Exam.find().populate({
        path: `subject`,
        select: [`subjectName`, `subjectCode`],
        populate: {
          path: `level`,
          model: `level`,
          select: `levelName`,
          populate: {
            path: `department`,
            model: `department`,
            select: `departmentName`,
          },
        },
      });

      for (let exam in exams) {
        examsCount++;
      }
      if (exams) {
        res
          .status(StatusCodes.OK)
          .json({ message: `exams`, examsCount: examsCount, data: exams });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Error while getting exams!` });
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal server error!`, error: error });
      console.log(error);
    }
  }
};

exports.updateExamHandler = async (req, res) => {
  const { id } = req.params;
  const { title, date, duration } = req.body;
  try {
    const exam = await Exam.findOne({ _id: id });
    if (exam) {
      const updated = await Exam.updateOne(
        { _id: id },
        {
          title,
          date,
          duration,
        }
      ).populate({
        path: `subject`,
        select: `subjectName subjectCode`,
        populate: {
          path: "level",
          select: `levelName`,
          populate: {
            path: `department`,
            select: `departmentName`,
          },
        },
      });
      if (updated.modifiedCount) {
        res
          .status(StatusCodes.OK)
          .json({ message: `Exam updated successfully!`, data: updated });
      } else {
        res
          .status(StatusCodes.NOT_MODIFIED)
          .json({ message: `Error while updating exam!` });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Exam not Found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.getExamInfoHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findOne({ _id: id }).populate({
      path: `subject`,
      select: `subjectName subjectCode`,
      populate: {
        path: `level`,
        select: `levelName`,
        populate: {
          path: `department`,
          select: `departmentName`,
        },
      },
    });
    console.log(exam);
    if (exam) {
      res.status(StatusCodes.OK).json({
        message: `exam`,
        data: exam,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.deleteExamHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findOne({ _id: id });
    if (exam) {
      const deleted = await Exam.deleteOne({ _id: id });
      if (deleted.deletedCount > 0) {
        res
          .status(StatusCodes.OK)
          .json({ message: `Exam deleted successfully!`, data: id });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Something went wrong, please try again later.` });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Exam not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};
