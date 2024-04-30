const mongoose = require('mongoose');
const Question = require('./question');

const SurveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    is_active: { type: Boolean, default: function() {
        return this.end_date >= Date.now(); 
    }},
});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;
