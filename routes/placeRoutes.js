const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

router.get('/', async (req, res, next) => {
    try {
        const places = await Place.get();
        return res.json({places});
    } catch (e) {
        return next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const place = await Place.getById(id);
        return res.json({place})
    } catch (e) {
        return next(e);
    }
});

module.exports = router;

