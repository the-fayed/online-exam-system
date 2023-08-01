const { StatusCodes } = require("http-status-codes");
const Exam = require(`../model/exam model/examModel`);

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
    const { id } = req.query;
    try {
      let examsCount = 0;
      const exams = await Exam.find({ subject: id });
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
      const exams = await Exam.find()
        .populate({
          path: `subject`,
          select: [`subjectName`, `subjectCode`],
          populate: {
            path: `department`,
            model: `department`,
            select: `departmentName`,
          },
        })
        .populate({
          path: `subject`,
          select: [`subjectName`, `subjectCode`],
          populate: {
            path: `level`,
            model: `level`,
            select: `levelName`,
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
