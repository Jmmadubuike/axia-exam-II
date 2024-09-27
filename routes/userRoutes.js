const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Logout user
router.post('/logout', userController.logoutUser);

// Delete user
router.delete('/delete', userController.deleteUser);

module.exports = router;
