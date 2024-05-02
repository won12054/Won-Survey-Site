const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const indexRoute = require('../routes/index'); 
app.use('/api', indexRoute);

module.exports = app;
