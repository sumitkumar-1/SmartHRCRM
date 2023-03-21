const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');
const Auth = require('../middleware/userauth');

router.post('/', UserController.createUser);
router.get('/', Auth.verifyUserToken, UserController.getUsers);
router.get('/:id', Auth.verifyUserToken, UserController.getUserById);
router.patch('/:id', Auth.verifyUserToken, UserController.updateUser);
router.delete('/:id', Auth.verifyUserToken, UserController.deleteUser);

module.exports = router;