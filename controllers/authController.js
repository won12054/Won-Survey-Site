const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        const token = jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }  
        );

        const userToSend = savedUser.toObject();
        delete userToSend.password;

        res.cookie('authToken', token, { httpOnly: true, maxAge: 600000, secure: true }); // 10 minutes
        
        res.status(201).json({ user: userToSend, message: 'User registered' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.checkEmailExists = async (req, res) => {
    const { email } = req.query;
    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(200).json({ isAvailable: false, message: 'Email is already taken' });
        }
        res.status(200).json({ isAvailable: true, message: 'Email is available' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// check if the username already exists
exports.checkUsernameExists = async (req, res) => {
    const { username } = req.query;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(200).json({ isAvailable: false, message: 'Username already exists' });
        }
        res.status(200).json({ isAvailable: true, message: 'Username is available' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ message: info.message });
        }

        req.logIn(user, async function(err) {
            if (err) return next(err);
            try {
                const token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                await User.findByIdAndUpdate(
                    user._id,
                    { $inc: { login_count: 1 }, last_login: new Date() },
                    { new: true, useFindAndModify: false }
                );

                const updatedUserWithoutPassword = await User.findById(user._id).select('-password');

                res.cookie('authToken', token, { httpOnly: true, maxAge: 600000, secure: true }); // 10 minutes

                return res.json({ message: 'Successfully logged in', user: updatedUserWithoutPassword });
            } catch (error) {
                return res.status(500).json({ message: "Failed to login", error: error.message });
            }
        });
    })(req, res, next);
};