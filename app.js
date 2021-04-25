const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const placeRoutes = require('./routes/placeRoutes');
const drinkRoutes = require('./routes/drinkRoutes');
const authRoutes = require('./routes/authRoutes');
const { ExpressError } = require('./expressError');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/place', placeRoutes);
app.use('/api/drink', drinkRoutes);

app.use((req, res, next) => {
    return next(new ExpressError("Resource not found", 404));
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Server Error";
    return res.status(status).json({ error: { message, status } });
});

module.exports = app;

