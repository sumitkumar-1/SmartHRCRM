const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/profile.controller');
const Auth = require('../middleware/userauth');

router.post('/', Auth.verifyUserToken, ProfileController.createProfile);
router.get('/', Auth.verifyUserToken, ProfileController.getProfiles);
router.get('/:id', Auth.verifyUserToken, ProfileController.getProfileById);
router.get('/user/:id', Auth.verifyUserToken, ProfileController.getProfileByUserId);
router.patch('/:id', Auth.verifyUserToken, ProfileController.updateProfile);
router.delete('/:id', Auth.verifyUserToken, ProfileController.deleteProfile);

module.exports = router;