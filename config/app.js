const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('../middleware/passportSetup');
const indexRoutes = require('../routes/indexRoutes');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const surveyRoutes = require('../routes/surveyRoutes');

require('dotenv').config();

const sessionSecret = process.env.SESSION_SECRET;
const app = express();

app.use(express.json());

app.use(cors());
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

/* index routes */
app.use('/api', indexRoutes);

/* auth routes */
app.use('/api/auth', authRoutes);

/* user routes */
app.use('/api/users', userRoutes);

/* survey routes */
app.use('/api/surveys', surveyRoutes);

module.exports = app;
