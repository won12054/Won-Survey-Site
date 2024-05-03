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