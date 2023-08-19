const Answer = require(`../model/answerModel`);
const Question = require(`../../questions/model/questionsModel`);
const { StatusCodes } = require("http-status-codes");
const User = require(`../../users/model/userModel`);

exports.submitAnswersHandler = async (req, res) => {
  const { questionId, studentId } = req.params;
  const { answer } = req.body;
  try {
    const question = await Question.findOne({ _id: questionId });
    if (question) {
      const existedAnswer = await Answer.findOne({
        questionId: questionId,
        studentId: studentId,
      });
      if (existedAnswer) {
        res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: `Student already have answered this question!` });
      } else {
        let answerObj = await Answer.create({
          studentId: studentId,
          questionId: questionId,
          answer: answer,
        });
        if (answerObj) {
          res
            .status(StatusCodes.CREATED)
            .json({ message: `Answer submitted successfully!` });
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: `Error while submitting you answer, try again` });
        }
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
    console.log(error);
  }
};

// exports.getStudentGradeHandler = async (req, res) => {
//   const { examId, studentId } = req.params;
//   try {
//     let grade = 0;
//     let studentAnswers = [];
//     const questions = await Question.find({ exam: examId }).select(
//       `rightAnswer _id`
//     );
//     for (let rightAnswer in questions) {
//       const studentAnswer = await Answer.findOne({
//         studentId: studentId,
//         questionId: questions[rightAnswer]._id,
//       }).select(`questionId answer`);
//       studentAnswers.push(studentAnswer);
//       for (let stdAns in studentAnswers) {
//         if (
//           studentAnswers[stdAns].answer === questions[rightAnswer].rightAnswer
//         ) {
//           grade++;
//         }
//       }
//     }
//     console.log(studentAnswers, questions);
//     res
//       .status(StatusCodes.OK)
//       .json({ questionsRightAnswers: questions, studentAnswers, grade });
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: `Internal server error!`, error });
//     console.log(error);
//   }
// };

exports.compareStudentAnswerWithRightAnswer = async (req, res) => {
  const { examId, studentId } = req.params;
  try {
    let grade = 0;
    let studentAnswers = [];
    let questionsCount = 0;
    const questions = await Question.find({ exam: examId }).populate(
      `exam`,
      `subject title date`
    );
    if (questions) {
      for (let question in questions) {
        questionsCount++;
        const studentAnswer = await Answer.findOne({
          questionId: questions[question]._id,
          studentId: studentId,
        }).populate(`studentId`, `userName -_id`);
        studentAnswers.push(studentAnswer);
        if (studentAnswer.answer == questions[question].rightAnswer) {
          grade++;
        }
      }
      res.status(StatusCodes.ACCEPTED).json({
        student: studentAnswers._id,
        questionsCount,
        questions,
        studentAnswers,
        grade,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error });
    console.log(error);
  }
};
