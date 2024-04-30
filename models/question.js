const mongoose = require('mongoose');
const Answer = require('./answer');

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { type: String, required: true, enum: ['text', 'multipleChoice'] },
    options: [{ 
        text: { type: String },
        isCorrect: { type: Boolean, default: false } // only necessary for multiple choice questions
    }],
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }] 
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
