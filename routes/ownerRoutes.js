const express = require('express');
const router = express.Router();
const PlaceOwners = require('../models/PlaceOwners');

router.get('/', async (req, res, next) => {
    try {
        const place_owners = await PlaceOwners.getPlaceOwners();
        return res.json({place_owners})
    } catch (e) {
        return next (e);
    }
    
});

module.exports = router;