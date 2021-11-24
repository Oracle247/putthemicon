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
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port)
        console.log("connected to db")
    })
    .catch((err) => console.log(err))

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client'))

const {
    register,
    contact
} = require("./controllers/user.controller");

const {
    userDetails
} = require("./controllers/admin.controller");

const {
    signin
} = require("./controllers/auth.controller");

const verifyToken = require("./middlewares/authJwt.js");


app.get('/', (req, res) => {
    res.sendFile('./client/main.html', { root: __dirname })
})

app.post('/submit', register)

app.get('/about', (req, res) => {
    res.sendFile('./client/about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {
    res.sendFile('./client/contact.html', { root: __dirname })
})

app.post('/contact', contact)

//admin login
app.get('/signin', (req, res) => {
    res.sendFile('./client/bo.html', { root: __dirname })
})
app.get('/dashboard', (req, res) => {
    res.sendFile('./client/dashboard.html', { root: __dirname })
})

app.get('/userDetails', userDetails);

app.post('/signin', signin);
