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
});

router.post('/', async (req, res, next) => {
    try {
        const drink = await Drink.create(req.body);
        return res.status(201).json({drink});
    } catch (e) {
        return next(e);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const drink = await Drink.update(id, req.body);
        return res.json({ drink });
    } catch (e) {
        return next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Drink.delete(id);
        return res.json({message: "deleted"});
    } catch (e) {
        return next(e);
    }
});

module.exports = router;