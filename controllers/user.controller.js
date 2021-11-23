const { response } = require('express');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer")
const path = require("path")

const sendMail = require("../middlewares/send.mail")
const register = (req, res, next) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
    state: req.body.state,
    lga: req.body.lga,
    city: req.body.city,
    hobby: req.body.hobby,
    genre: req.body.genre,
    about: req.body.about,
    pic: req.body.pic
  })
  
  
  user.save()
  .then((user) => {
    res.status(200).json({
      error: "null",
      message: "Registeration successful"
    });    
    // res.redirect()
  })
  .catch((err) => {
    res.json({
      error: err,
      message: "null"
    })
  })
}

const contact = (req, res, next) => {
  var name = req.body.fullName;
  var email = req.body.email;
  var phone = req.body.phone;
  var message = req.body.message;
  try{
    var mailOpt = {
      from: "noreply@example.com",
      to: process.env.USER_NAME,
      subject: 'Contact Us Form',
      html: `
        <h2>Contact Us Form<p>
        <p>Name: ${name} </br> Email: ${email} </br> Phone Number: ${phone} </br> Message: ${message}</p>
      `
    };
    sendMail(mailOpt);
    res.status(200).json({
      error: "null",
      message: "sent successful"
    })
  }catch(err){
    res.json({
      error: err,
      message: "null"
    })
  }
}

module.exports = {
  register,
  contact
}