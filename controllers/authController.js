const User = require('../models/user');
const passport = require('passport');

exports.register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// check if the email already exists
exports.checkEmailExists = async (req, res) => {
    const { email } = req.query;
    try {
        const emailExists = await User.findOneAndDelete({ email });
        if (email.Exists) {
            return res.status(409).json({ message: 'Email is already taken' });
        }
        res.status(200).json({ message: 'Email is aviailable' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// check if the username already exists
exports.checkUsernameExists = async (req, res) => {
    const { username } = req.query;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        res.status(200).json({ message: 'Username is available' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) return next(err); // handle passport errors by passing them to the next middleware
        if (!user) { 
            return res.status(400).json({ message: info.message });
        }

        req.logIn(user, async function(err) {
            if (err) return next(err); 
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                    { $inc: { login_count: 1 }, last_login: new Date() }, // update the login count and last login date
                    { new: true, useFindAndModify: false }
                );
                return res.json({ message: 'Successfully logged in', user: updatedUser });
            } catch (error) {
                return res.status(500).json({ message: "Failed to login" });
            }
        });
    })(req, res, next); // pass the request, response, and next function to passport.authenticate middleware
};