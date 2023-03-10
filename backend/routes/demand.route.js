const express = require('express');
const router = express.Router();

const DemandController = require('../controllers/demand.controller');
const Auth = require('../middleware/auth');

router.post('/', Auth.verifyToken, DemandController.createDemand);
router.get('/', Auth.verifyToken, DemandController.getDemands);
router.get('/:id', Auth.verifyToken, DemandController.getDemandById);
router.patch('/:id', Auth.verifyToken, DemandController.updateDemand);
router.delete('/:id', Auth.verifyToken, DemandController.deleteDemand);

module.exports = router;