const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        const token = jwt.sign(user, process.env.JWT_SECRET);
        return res.status(201).json({token});
    } catch (e) {
        return next(e);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = jwt.sign(user, process.env.JWT_SECRET);
        return res.json({token})
    } catch (e) {
        return next(e);
    }
});

module.exports = router;