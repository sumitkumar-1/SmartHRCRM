const express = require('express');
const router = express.Router();

const DemandHandlerController = require('../controllers/demandhandler.controller');
const Auth = require('../middleware/auth');

router.post('/', Auth.verifyToken, DemandHandlerController.createDemandHandler);
router.get('/', Auth.verifyToken, DemandHandlerController.getDemandHandlers);
router.get('/:id', Auth.verifyToken, DemandHandlerController.getDemandHandlerById);
router.patch('/:id', Auth.verifyToken, DemandHandlerController.updateDemandHandler);
router.delete('/:id', Auth.verifyToken, DemandHandlerController.deleteDemandHandler);

module.exports = router;