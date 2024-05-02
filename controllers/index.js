const express = require('express');
const router = express.Router();

module.exports.displayHome = (req, res) => {
    res.status(200).json({ message: "Backend is running" });
}