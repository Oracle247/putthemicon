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
        console.log(req.body.username + " : " + req.body.password)
        const admin = await Admin.findOne({ username: req.body.username });
        if (!admin) {
            return res.json({
                nouser: "Admin Not found."
            });
        }


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
        res.setHeader("x-access-token", token);
        res.json({
                error: null,
                message: "success",
                redirect: true,
                redirectUrl: '/dashboard',
                token,
                refreshToken
            })
            // res.redirect(`/dashboard`);

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