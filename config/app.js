const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('../middleware/passportSetup');
const indexRoute = require('../routes/indexRoutes');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

/* index routes */
app.use('/api', indexRoute);

/* auth routes */
app.use('/api/auth', authRoutes);

/* user routes */
app.use('/api/users', userRoutes);

module.exports = app;
