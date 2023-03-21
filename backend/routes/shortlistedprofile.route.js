const express = require('express');
const router = express.Router();

const ShortListedProfileController = require('../controllers/shortlistedprofile.controller');
const Auth = require('../middleware/userauth');

router.post('/', Auth.verifyUserToken, ShortListedProfileController.createShortListedProfile);
router.get('/', Auth.verifyUserToken, ShortListedProfileController.getShortListedProfiles);
router.get('/:id', Auth.verifyUserToken, ShortListedProfileController.getShortListedProfileById);
router.patch('/:id', Auth.verifyUserToken, ShortListedProfileController.updateShortListedProfile);
router.delete('/:id', Auth.verifyUserToken, ShortListedProfileController.deleteShortListedProfile);

module.exports = router;