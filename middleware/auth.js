const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../expressError');

function checkValidToken(req, res, next) {
    try {
        let token;
        if (req.cookies['TAPP_APP_TOKEN']) {
            token = JSON.parse(req.cookies['TAPP_APP_TOKEN'])
        } else {
            token = req.body.token;
        }
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = user;
            console.log(user);
        }
        next();
    } catch(e) {
        next();
    }
    
}

function checkForAuthenticatedUser(req, res, next) {
    console.log('locals', res.locals)
    if (res.locals.user) {
        return next();
    }
    return next(new UnauthorizedError());
}

module.exports = {
    checkValidToken,
    checkForAuthenticatedUser
};
