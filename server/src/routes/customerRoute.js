const express = require('express');
const customerRouter = express.Router();

const customerController = require('../controllers/customerController');



// POST
customerRouter.post('/', customerController.createCustomer );

// GET
customerRouter.get('/', (req,res) => {
    res.status(200).json({
        response: 'salut'
    })
} );

module.exports = customerRouter;