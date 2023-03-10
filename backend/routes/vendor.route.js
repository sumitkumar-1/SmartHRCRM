const express = require('express');
const router = express.Router();

const VendorController = require('../controllers/vendor.controller');
const Auth = require('../middleware/auth');

router.post('/', Auth.verifyToken, VendorController.createVendor);
router.get('/', Auth.verifyToken, VendorController.getVendors);
router.get('/:id', Auth.verifyToken, VendorController.getVendorById);
router.patch('/:id', Auth.verifyToken, VendorController.updateVendor);
router.delete('/:id', Auth.verifyToken, VendorController.deleteVendor);

module.exports = router;