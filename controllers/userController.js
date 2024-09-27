const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Logout user (clear cookie)
exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

// Delete user and clear cookies
exports.deleteUser = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOneAndDelete({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Clear user cookie
        res.clearCookie('token');
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

