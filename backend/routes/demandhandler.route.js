const express = require('express');
const router = express.Router();

const DemandHandlerController = require('../controllers/demandhandler.controller');
const Auth = require('../middleware/userauth');

router.post('/', Auth.verifyUserToken, DemandHandlerController.createDemandHandler);
router.get('/', Auth.verifyUserToken, DemandHandlerController.getDemandHandlers);
router.get('/:id', Auth.verifyUserToken, DemandHandlerController.getDemandHandlerById);
router.patch('/:id', Auth.verifyUserToken, DemandHandlerController.updateDemandHandler);
router.delete('/:id', Auth.verifyUserToken, DemandHandlerController.deleteDemandHandler);

module.exports = router;