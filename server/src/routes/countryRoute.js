const express = require('express');
const countryRouter = express.Router();

const countryController = require('../controllers/countryController');



// GET
countryRouter.get('/',  countryController.getCountryList); 

module.exports = countryRouter;