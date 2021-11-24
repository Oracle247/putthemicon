const Admin = require("../models/admin.js");
require("dotenv").config();
const path = require("path")
const sendMail = require("../middlewares/send.mail")

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
}

const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME });
}

//signin
const signin = async(req, res) => {
    var name = req.body.username
    var password = req.body.password

    //check email confirmation status 
    //...............................
    try {
        const admin = await Admin.findOne({ username: req.body.username });
        if (!admin) {
            return res.status(404).json({
                nouser: "Admin Not found."
            });
        }

        console.log(admin.password + " : " + req.body.password)
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            admin.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                invpass: "Invalid Password!"
            });
        }

        const token = createToken(admin._id);
        let refreshToken = createRefreshToken(admin._id);

        res.redirect(`/dashboard`);

    } catch (err) {
        res.json({
            error: err.message,
            message: null
        })
    }
};

module.exports = {
    signin
}
