const express = require('express');
const router = express.Router();
const {getUsers,getUserById,createUser, updateUser,getUserByEmail, disableUser, enableUser } = require('..//Controllers/UserController');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.get('/usersByEmail', getUserByEmail);
router.put('/users/enable/:id', enableUser);
router.put('/users/disable/:id', disableUser);




module.exports = router;