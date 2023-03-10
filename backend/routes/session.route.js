const express = require('express');
const router = express.Router();

const SessionController = require('../controllers/session.controller');

router.post('/login', SessionController.login);
router.post('/logout', SessionController.logout);

module.exports = router;