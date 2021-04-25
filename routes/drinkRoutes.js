const express = require('express');
const router = express.Router();
const Drink = require('../models/Drink');
const { searchUntappd } = require('../helpers/untappd');
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const drinks = await Drink.get();
        return res.json({drinks});
    } catch (e) {
        return next(e);
    }
});

router.get('/search', async (req, res, next) => {
    const { q } = req.query;
    const db_results = await Drink.searchDrinks(q);
    const untappd_results = await searchUntappd(q);
    return res.json({db_results, untappd_results});
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

router.get('/:id/draughts', async (req, res, next) => {
    try {
        const { id } = req.params;
        const places = await Drink.getDraughts(id);
        return res.json({ draughts: { drink: +id, places } });
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