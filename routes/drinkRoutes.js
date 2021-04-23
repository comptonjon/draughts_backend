const express = require('express');
const router = express.Router();
const Drink = require('../models/Drink');

router.get('/', async (req, res, next) => {
    try {
        const drinks = await Drink.get();
        return res.json({drinks});
    } catch (e) {
        return next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const drink = await Drink.getById(id);
        return res.json({drink});
    } catch (e) {
        return next(e);
    }
})

module.exports = router;