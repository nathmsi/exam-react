const express = require('express');

const customerRoute = require('./routes/customerRoute');

const api = express();


api.use('/customer', customerRoute);


module.exports = api