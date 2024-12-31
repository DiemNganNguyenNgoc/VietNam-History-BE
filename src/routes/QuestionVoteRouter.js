const express = require('express');
const router = express.Router();
const questionVoteController = require('../controllers/QuestionVoteController');

router.get('/votes/:questionId', questionVoteController.getVotesByQuestion);

router.get('/vote-status/:userId/:questionId', questionVoteController.checkVoteStatus);

router.get('/vote-stats/:questionId', questionVoteController.getVoteStats);

router.get("/votes/questions/:userId", questionVoteController.getVotesAndQuestionsFromUser);

module.exports = router;
