const express = require('express');
const router = express.Router();

const ShortListedProfileController = require('../controllers/shortlistedprofile.controller');
const Auth = require('../middleware/auth');

router.post('/', Auth.verifyToken, ShortListedProfileController.createShortListedProfile);
router.get('/', Auth.verifyToken, ShortListedProfileController.getShortListedProfiles);
router.get('/:id', Auth.verifyToken, ShortListedProfileController.getShortListedProfileById);
router.patch('/:id', Auth.verifyToken, ShortListedProfileController.updateShortListedProfile);
router.delete('/:id', Auth.verifyToken, ShortListedProfileController.deleteShortListedProfile);

module.exports = router;