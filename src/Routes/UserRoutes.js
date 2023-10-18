const express = require('express');
const router = express.Router();
const {getUsers,getUserById,createUser, updateUser,} = require('..//Controllers/UserController');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);

module.exports = router;