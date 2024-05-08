const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('../middleware/passportSetup');
const indexRoutes = require('../routes/indexRoutes');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');

require('dotenv').config();

const sessionSecret = process.env.SESSION_SECRET;
const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:4200',  
    credentials: true,  
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
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

module.exports = app;
