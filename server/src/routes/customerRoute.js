const express = require('express');
const customerRouter = express.Router();

const customerController = require('../controllers/customerController');

const middlewares = require('../middlewares/verifyTokenValidation')

// POST
customerRouter.post('/', customerController.createCustomer );

// GET
customerRouter.get('/', middlewares.verifyTokenValidation , customerController.getCustomers); // with token validation

module.exports = customerRouter;