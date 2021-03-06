const db = require("../db/database");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'some key'; // process.env.SECRET_KEY


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const QUERY_ADD_CUSTOMER = `INSERT INTO customer (firstName, lastName, password, country, city, street, email, phone, gender, married) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const QUERY_GET_CUSTOMERS = `SELECT * FROM customer`;


module.exports.createCustomer = function (req, res) {
    try {
        const {
            firstName,
            lastName,
            password,
            country,
            city,
            street,
            email,
            phone,
            gender,
            married
        } = req.body;
        if (!validateEmail(email)) {
            res.status(200).json({
                success: false,
                message: `Error was found email input not correct`
            });
        } else {
            if (
                firstName === '' ||
                lastName === '' ||
                password === '' ||
                country === '' ||
                city === '' ||
                street === '' ||
                phone === '' ||
                gender === '' ||
                married === undefined  // is boolean
            ) {
                res.status(200).json({
                    success: false,
                    message: `Error was found all inputs is required`
                });
            } else {
                bcrypt.hash(password, 10, function (err, hash) { // hash the password
                    if (err) {
                        res.status(200).json({
                            success: false,
                            message: `Error was found input not correct`
                        });
                    }
                    // insert into table customer with password hashed
                    const customer = [
                        firstName,
                        lastName,
                        hash,
                        country,
                        city,
                        street,
                        email,
                        phone,
                        gender,
                        married
                    ]
                    db.run(QUERY_ADD_CUSTOMER, [
                        ...customer,
                    ],
                        (error, rows) => {
                            if (error) {
                                res.status(200).json({
                                    success: false,
                                    message: `Error was found input not correct or user already exist`,
                                    error,
                                });
                            } else {
                                const token = jwt.sign({ email }, SECRET_KEY); // generate token from jwt
                                setTimeout(
                                    () => {
                                        res.status(200).json({
                                            success: true,
                                            token,
                                            customer: req.body
                                        });
                                    }
                                ,1500)
                            }
                        });
                });
            }
        }
    } catch (error) {
        res.status(200).json({
            success: false,
            message: `Error was found input not correct`,
        });
    }
};


module.exports.getCustomers = function (req, res) {
    try {
        db.all(QUERY_GET_CUSTOMERS , [], (err, rows) => { 
            if (err) {
                res.status(200).json({
                    success: false,
                    message: `error get list customers`
                });
            }
            res.status(200).json({
                success: true,
                customers: rows
            });
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: `error get list customers`
        });
    }
}