const express = require('express');
const router = express.Router();
const Draught = require('../models/Draught');

router.get('/', async (req, res, next) => {
    try {
        const draughts = await Draught.getDraughts();
        return res.json({draughts});
    } catch (e) {
        return next(e);
    }
})

module.exports = router;