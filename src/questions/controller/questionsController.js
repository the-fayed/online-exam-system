const { StatusCodes } = require("http-status-codes");
const Question = require(`../model/questionsModel`);
const Exam = require(`../../exams/model/examModel`);
const paginationService = require("../../../common/services/paginationService");

exports.getAllQuestionsHandler = async (req, res) => {
  const { examId } = req.params;
  const { page, size } = req.query;
  const { limit, skip } = paginationService(page, size);
  const user = req.user;
  try {
    if (
      user.role == `admin` ||
      (user.role == `professor` && user.verified == true)
    ) {
      let totalQuestions = 0;
      const questions = await Question.find({ exam: examId })
        .skip(skip)
        .limit(limit);
      if (questions) {
        for (let question in questions) {
          totalQuestions++;
        }
        res
          .status(StatusCodes.OK)
          .json({ message: `Questions`, totalQuestions, date: questions });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `No questions found!` });
      }
    } else if (user.role == `student` && user.verified == true) {
      const exam = await Exam.findOne({ _id: examId })
        .populate(`subject`, `level -_id`)
        .skip(skip)
        .limit(limit);
      if ((exam.subject.level = user.level)) {
        const questions = await Question.find({ exam: exam._id }).select(
          `-rightAnswer`
        );
        res.status(StatusCodes.ACCEPTED).json({
          examTitle: `${exam.title}`,
          duration: `${exam.duration}`,
          questions: questions,
        });
      } else if ((exam.subject.level = user.level)) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `This exam will be in ${exam.date}` });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error });
    console.log(error);
  }
};

exports.addNewQuestionHandler = async (req, res) => {
  const { examId } = req.params;
  const { question, options, rightAnswer } = req.body;
  try {
    const exam = await Exam.findOne({ _id: examId });
    if (exam) {
      const NewQuestion = await Question.create({
        exam: examId,
        question,
        options,
        rightAnswer,
      });
      if (NewQuestion) {
        res.status(StatusCodes.CREATED).json({
          message: `Question created successfully!`,
          data: NewQuestion,
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Error while creating question, try again later.` });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Exam not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error });
    console.log(error);
  }
};

exports.updateQuestionHandler = async (req, res) => {
  const { examId, questionId } = req.params;
  const { questionTxt, options, rightAnswer } = req.body;
  try {
    const question = await Question.findOne({ exam: examId, _id: questionId });
    if (question) {
      const updated = await Question.updateOne(
        { exam: examId, _id: questionId },
        {
          question: questionTxt,
          options: options,
          rightAnswer: rightAnswer,
        }
      );
      if (updated.modifiedCount > 0) {
        res
          .status(StatusCodes.OK)
          .json({ message: `Question updated successfully!` });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Error while updating the question` });
      }
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Question not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error });
  }
};

exports.deleteQuestionHandler = async (req, res) => {
  const { examId, questionId } = req.params;
  try {
    const question = await Question.findOne({ exam: examId, _id: questionId });
    if (question) {
      const deleted = await Question.deleteOne({
        exam: examId,
        _id: questionId,
      });
      if (deleted.deletedCount > 0) {
        res.status(StatusCodes.OK).json({
          message: `Question deleted successfully!`,
          data: questionId,
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Error while deleting question!` });
      }
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Question not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error });
  }
};
