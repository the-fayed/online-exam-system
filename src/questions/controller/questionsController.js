const { StatusCodes } = require("http-status-codes");
const Question = require(`../model/questionsModel`);

exports.getAllQuestionsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let totalQuestions = 0;
    const questions = await Question.find({ exam: id });
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
  const { id } = req.params;
  const { question, options, rightAnswer } = req.body;
  try {
    const NewQuestion = await Question.create({
      exam: id,
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
