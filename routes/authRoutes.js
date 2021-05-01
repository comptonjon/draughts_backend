const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { checkForAuthenticatedUser } = require('../middleware/auth');
const userCreateSchema = require('../schemata/userCreateSchema.json');
const userLoginSchema = require('../schemata/userLoginSchema.json');
const jsonschema = require('jsonschema');
const { ExpressError } = require('../expressError');

router.post('/register', async (req, res, next) => {
    try {
        const schemaCheck = jsonschema.validate(req.body, userCreateSchema);
        if (schemaCheck.valid) {
            const user = await User.register(req.body);
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.status(201).json({token});
        }
        //res.cookie('TAPP_APP_TOKEN', token, { secure: true, httpOnly: true });
        const errorList = schemaCheck.errors.map(error => error.stack);
        return next(new ExpressError(errorList, 400));
    } catch (e) {
        return next(e);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const schemaCheck = jsonschema.validate(req.body, userLoginSchema);
        if (schemaCheck.valid) {
            const user = await User.authenticate(username, password);
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.cookie('TAPP_APP_TOKEN', JSON.stringify(token), { secure: true, httpOnly: true });
            return res.json({token})
        }
        const errorList = schemaCheck.errors.map(error => error.stack);
        return next(new ExpressError(errorList, 400));
    } catch (e) {
        return next(e);
    }
});

router.post('/logout', async (req, res, next) => {
    res.clearCookie('TAPP_APP_TOKEN');
    return res.json({message: 'Logout successful'})
});

module.exports = router;