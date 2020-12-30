const jwt = require('jsonwebtoken');
const db = require("../db/database");

const SECRET_KEY = 'some key'; // process.env.SECRET_KEY

module.exports.verifyTokenValidation = function (req, res, next) {  // verify header bearer token 
    try {
        if (req.headers) {
            const { authorization } = req.headers;
            if (!authorization) { // exist authorization in header
                res.status(200).json({
                    success: false,
                    message: `token not found`
                });
            }

            const token = authorization.replace('Bearer ', '');
            jwt.verify(token, SECRET_KEY, async function (err, payload) {  // jwt verify token
                if (err) {
                    res.status(200).json({
                        success: false,
                        message: `token not valid`
                    });
                } else { // can access
                    next();
                }
            })
        } else {
            res.status(200).json({
                success: false,
                message: `token failed`
            });
        }
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: `token failed`
        });
    }
}