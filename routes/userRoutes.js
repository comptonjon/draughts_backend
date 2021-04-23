const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.get();
        return res.json({users});
    } catch (e) {
        return next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.getById(id);
        return res.json({ user });
    } catch (e) {
        return next(e);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.update(id, req.body);
        return res.json({ user });
    } catch (e) {
        return next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.delete(id);
        return res.json({ message: "deleted" });
    } catch (e) {
        return next(e);
    }
})

module.exports = router;