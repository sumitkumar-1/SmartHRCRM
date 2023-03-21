const express = require('express');
const router = express.Router();

const InterviewController = require('../controllers/interview.controller');
const Auth = require('../middleware/userauth');

router.post('/', InterviewController.createInterview);
router.get('/', Auth.verifyUserToken, InterviewController.getInterviews);
router.get('/:id', Auth.verifyUserToken, InterviewController.getInterviewById);
router.patch('/:id', Auth.verifyUserToken, InterviewController.updateInterview);
router.delete('/:id', Auth.verifyUserToken, InterviewController.deleteInterview);

module.exports = router;