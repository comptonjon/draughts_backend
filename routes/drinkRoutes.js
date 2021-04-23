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

module.exports = router;