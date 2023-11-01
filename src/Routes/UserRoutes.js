const express = require('express');
const router = express.Router();
const {getUsers,getUserById,createUser, updateUser,getUserByEmail, disableUser, enableUser, updateUserRole, getUserRoles } = require('..//Controllers/UserController');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.get('/usersByEmail', getUserByEmail);
router.put('/users/enable/:id', enableUser);
router.put('/users/disable/:id', disableUser);
router.put('/updateRole/:id', updateUserRole);
router.get('/userRoles', getUserRoles);


module.exports = router;