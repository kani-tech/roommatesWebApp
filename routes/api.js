const express = require('express')

const userRouter = express.Router()

const user = require('../models/userModel.js')
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
    res.json({
        msg: 'Data received'
    });
    const newUser = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.Email,
        password: req.body.password
    })

    newUser.save()
})