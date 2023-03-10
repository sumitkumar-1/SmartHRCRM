const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');
const Auth = require('../middleware/auth');

router.post('/', UserController.createUser);
router.get('/', Auth.verifyToken, UserController.getUsers);
router.get('/:id', Auth.verifyToken, UserController.getUserById);
router.patch('/:id', Auth.verifyToken, UserController.updateUser);
router.delete('/:id', Auth.verifyToken, UserController.deleteUser);

module.exports = router;