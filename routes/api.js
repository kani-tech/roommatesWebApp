const express = require('express')

const userRouter = express.Router()

const user = require('../models/userModel.js')

const USER_LOGIN_SUCCESS = 1234;
const USER_LOGIN_FAIL = 4321;

module.exports = userRouter


// Router
userRouter.get('/', function (req, res) {

    user.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((error) => console.log(error));
})

userRouter.post('/register', function (req, res) {
    console.log('Body:', req.body)
    console.log('Password', req.body.Password)
    res.json({
        msg: 'Data received'
    });

    try {
        const newUser = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.Email,
            password: req.body.Password
        })

        //let user = await user.findOne({ email: email };
        //if (user) return res.status(400).send("User already registered.");

        newUser.save();
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

userRouter.post('/login', function (req, res) {
    const email = req.body.Email;
    const password = req.body.Password
    user.findOne({ email: email }, function (err, foundUser) {
        console.log(foundUser);
        if (err) {
            console.log(err)
        } else if (foundUser.password == password) {
            res.send({
                token: USER_LOGIN_SUCCESS
            })
        } else {
            res.send({
                token: USER_LOGIN_FAIL
            })
        }
    })
})