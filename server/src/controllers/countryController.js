const db = require("../db/database");
const QUERY_GET_CUSTOMERS = `SELECT * FROM country`;



module.exports.getCountryList = function (req, res) {
    try {
        db.all(QUERY_GET_CUSTOMERS , [], (err, rows) => { 
            if (err) {
                res.status(200).json({
                    success: false,
                    message: `error get list country`
                });
            }
            res.status(200).json({
                success: true,
                country: rows
            });
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: `error get list country`
        });
    }
}