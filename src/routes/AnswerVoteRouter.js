const express = require('express');
const router = express.Router();
const AnswerVoteController = require('../controllers/AnswerVoteController');

router.post('/vote', AnswerVoteController.createOrUpdateVote);
router.delete('/vote/:userId/:answerId', AnswerVoteController.deleteVote);
router.get('/votes/:answerId', AnswerVoteController.getVotesByComment);
router.get('/vote-status/:userId/:answerId', AnswerVoteController.checkVoteStatus);
router.get('/vote-stats/:answerId', AnswerVoteController.getVoteStats);

module.exports = router;
