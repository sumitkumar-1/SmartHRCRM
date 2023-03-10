const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/profile.controller');
const Auth = require('../middleware/auth');

router.post('/', Auth.verifyToken, ProfileController.createProfile);
router.get('/', Auth.verifyToken, ProfileController.getProfiles);
router.get('/:id', Auth.verifyToken, ProfileController.getProfileById);
router.patch('/:id', Auth.verifyToken, ProfileController.updateProfile);
router.delete('/:id', Auth.verifyToken, ProfileController.deleteProfile);

module.exports = router;