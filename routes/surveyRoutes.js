const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

router.get('/survey-list', surveyController.getAllSurveys);
router.post('/survey-list', surveyController.createSurvey);

module.exports = router;