const express = require('express');
const db = require('../db');
const router = express.Router();
const PlaceRatings = require('../models/PlaceRatings');

router.get('/place', async (req, res, next) => {
    try {
        const place_ratings = await PlaceRatings.getPlaceRatings();
        return res.json({place_ratings})
    } catch (e) {
        return next(e);
    }
});

module.exports = router;