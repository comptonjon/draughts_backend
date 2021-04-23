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

module.exports = router;

