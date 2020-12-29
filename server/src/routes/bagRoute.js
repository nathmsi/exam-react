const express = require('express');
const bagRouter = express.Router();
var fs = require('fs');


const bagControler = require('../controllers/bagControler');


// GET
bagRouter.get('/part1', bagControler.getCountShinyGoldBagContainInBag);

bagRouter.get('/part2',bagControler.getCountContainInBag);


module.exports = bagRouter;