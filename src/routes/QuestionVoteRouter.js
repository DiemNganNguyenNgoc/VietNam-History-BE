const express = require('express');
const router = express.Router();
const QuestionVoteController = require('../controllers/QuestionVoteController');

router.post('/vote', QuestionVoteController.createOrUpdateVote);
router.delete('/vote/:userId/:questionId', QuestionVoteController.deleteVote);
router.get('/votes/:questionId', QuestionVoteController.getVotesByQuestion);
router.get('/vote-status/:userId/:questionId', QuestionVoteController.checkVoteStatus);
router.get('/vote-stats/:questionId', QuestionVoteController.getVoteStats);

module.exports = router;
