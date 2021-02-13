import Question from '../../models/questionModel.js';
import { loggedin, admin } from '../../utils/verifyUser.js';

const questions = async () => {
  try {
    const questions = await Question.find({});
    return questions;
  } catch (err) {
    throw err;
  }
};

const question = async (args, { req, redis }) => {
  try {
    const question = await Question.findOne({
      level: args.level,
      index: args.index,
    });
    return question;
  } catch (err) {
    throw err;
  }
};

const editQuestions = async (args, { req, redis }) => {
  try {
    if (admin(req)) {
      const { details } = args;

      await Question.find({}).deleteMany({});

      for (let i = 0; i < details.length; i++) {
        const newQuestions = new Question({
          msg: details[i].msg,
          info: details[i].info,
          level: details[i].level,
          index: details[i].index,
        });
        await newQuestions.save();
      }

      return { msg: 'success' };
    }
  } catch (err) {
    throw err;
  }
};

export { questions, question, editQuestions };
