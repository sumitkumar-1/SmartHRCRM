const express = require('express');
const router = express.Router();

const DemandController = require('../controllers/demand.controller');
const Auth = require('../middleware/userauth');

router.post('/', Auth.verifyUserToken, DemandController.createDemand);
router.get('/', Auth.verifyUserToken, DemandController.getDemands);
router.get('/:id', Auth.verifyUserToken, DemandController.getDemandById);
router.patch('/:id', Auth.verifyUserToken, DemandController.updateDemand);
router.delete('/:id', Auth.verifyUserToken, DemandController.deleteDemand);

module.exports = router;