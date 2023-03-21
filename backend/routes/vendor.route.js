const express = require('express');
const router = express.Router();

const VendorController = require('../controllers/vendor.controller');
const Auth = require('../middleware/userauth');

router.post('/', Auth.verifyUserToken, VendorController.createVendor);
router.get('/', Auth.verifyUserToken, VendorController.getVendors);
router.get('/:id', Auth.verifyUserToken, VendorController.getVendorById);
router.patch('/:id', Auth.verifyUserToken, VendorController.updateVendor);
router.delete('/:id', Auth.verifyUserToken, VendorController.deleteVendor);

module.exports = router;