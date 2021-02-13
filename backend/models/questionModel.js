import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  msg: {
    type: String,
    default: '',
  },
  info: {
    type: String,
    default: '',
  },
  level: {
    type: String,
    default: '',
  },
  index: {
    type: String,
    default: '',
  },
},
{
  timestamps: true,
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;