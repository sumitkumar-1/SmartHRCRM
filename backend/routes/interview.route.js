const express = require('express');
const router = express.Router();

const InterviewController = require('../controllers/interview.controller');
const Auth = require('../middleware/auth');

router.post('/', InterviewController.createInterview);
router.get('/', Auth.verifyToken, InterviewController.getInterviews);
router.get('/:id', Auth.verifyToken, InterviewController.getInterviewById);
router.patch('/:id', Auth.verifyToken, InterviewController.updateInterview);
router.delete('/:id', Auth.verifyToken, InterviewController.deleteInterview);

module.exports = router;