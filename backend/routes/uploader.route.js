const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const UploaderController = require('../controllers/uploader.controller');
const Auth = require('../middleware/userauth');

router.post('/upload', Auth.verifyUserToken, upload.single('file'), UploaderController.uploadFile);

module.exports = router;