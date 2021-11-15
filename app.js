const express = require('express')
const mongoose = require('mongoose')

const dotenv = require('dotenv');
const bodyParser = require("body-parser");
dotenv.config();

const User = require("./models/user.js")
const sendMail = require("./middlewares/send.mail")

const port = process.env.PORT || 7000;
//express app
const app = express() 
//connect to mongodb
const dbURI = process.env.MONGODB_URI || "mongodb+srv://Oracle247:oracle247@cluster0.qvwi6.mongodb.net/putthemicondb?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    app.listen(port)
    console.log("connected to db")
})
.catch((err) => console.log(err))

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client'))


app.get('/', (req, res) => {
    res.sendFile('./client/main.html', { root: __dirname })
})

app.post('/submit', (req, res) => {
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
    })
    .catch((err) => {
      res.json({
        error: err,
        message: "null"
      })
    })
})


app.get('/about', (req, res) => {
    res.sendFile('./client/about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {
    res.sendFile('./client/contact.html', { root: __dirname })
})

app.post('/contact', (req, res) => {
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
  
})
