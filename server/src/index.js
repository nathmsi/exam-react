const express = require('express');

const customerRoute = require('./routes/customerRoute');
const countryRoute = require('./routes/countryRoute');

const api = express();


api.use('/customer', customerRoute);
api.use('/country', countryRoute);


module.exports = api