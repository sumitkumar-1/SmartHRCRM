const express = require('express');
const router = express.Router();

const ConfigController = require('../controllers/config.controller');

router.post('/', ConfigController.updateConfig);

module.exports = router;