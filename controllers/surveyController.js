const Survey = require('../models/survey');

exports.getAllSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find().populate('author', 'username').exec();
        res.json(surveys);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createSurvey = async (req, res) => {
    const { title, description, is_public, author, questions, start_date, end_date } = req.body;

    const survey = new Survey({
        title,
        description,
        is_public,
        author,
        questions,
        start_date,
        end_date,
        is_active: end_date >= Date.now()
    });

    try {
        const newSurvey = await survey.save();
        res.status(201).json(newSurvey);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }


};