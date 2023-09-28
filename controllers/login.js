const express = require('express');
const router = express.Router();
require('dotenv').config();

// Route for password authentication
router.post('/login', (req, res) => {
    const { password } = req.body;
    const correctPassword = process.env.PASSWORD;

    if (password === correctPassword) {
        res.redirect('/private');
    } else {
        res.send('Invalid password');
    }
});

module.exports = router;
