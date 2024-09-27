const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication
    res.status(200).json({ message: 'Login with Google successful' });
});

module.exports = router;
