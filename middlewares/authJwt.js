const jwt = require("jsonwebtoken");

const Admin = require("../models/admin.js");

//verify token
verifyToken = (req, res, next) => {
    try {
        let token = req.headers["x-access-token"];
        // console.log(token);

        if (!token) {
            return res.status(403).json({
                message: "No token provided!"
            });
        }

        decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.admin = decode;
        next();
    } catch (error) {
        if (error.name == "TokenExpiredError") {
            res.status(401).json({
                message: "Token Expired"
            })
        } else {
            res.json({
                message: 'Authenticate Failed'
            });
        }
    }
};


module.exports = verifyToken;