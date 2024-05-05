const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    birth_date: { type: Date },
    gender: { type: String },
    country: { type: String, required: true },
    occupation: { type: String },
    education_level: { type: String },
    ethnicity: { type: String },
    registration_date: { type: Date, default: Date.now },
    last_login: { type: Date, default: Date.now },
    login_count: { type: Number, default: 0 },
    subscription_type: { type: String, enum: ['free', 'premium', 'enterprise'], default: 'free'},
});

// runs before a document is saved to the database
userSchema.pre('save', function(next) { // passes control to the next middleware
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10); // number of rounds
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
