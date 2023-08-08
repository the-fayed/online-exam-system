const { StatusCodes } = require("http-status-codes");
const Question = require(`../model/questionsModel`);

exports.getAllQuestionsHandler = async (req, res) => {
  const { examId } = req.params;
  try {
    let totalQuestions = 0;
    const questions = await Question.find({ exam: examId });
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
        res
          .status(StatusCodes.OK)
          .json({
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
