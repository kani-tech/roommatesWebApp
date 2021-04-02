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

userRouter.post('/register', async function (req, res) {
    console.log('Body:', req.body)
    console.log('Password', req.body.Password)

    try {
        let existEmail = await user.findOne({ email: req.body.Email });
        if (existEmail) {
            res.send({
                token: USER_LOGIN_FAIL
            })
            return
        } else {
            res.send({
                token: USER_LOGIN_SUCCESS
            })
            const newUser = new user({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.Email,
                password: req.body.Password
            })

            newUser.save()
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

userRouter.post('/roomKeyPage', async function (req, res) {
    console.log('Body:', req.body)
    user.updateOne({ email: req.body.email }, { roomKey: req.body.roomKey }, function (err) {
        if (err) {
            console.log('error123');
            // res.send({
            //     token: USER_LOGIN_FAIL
            // })
        } else {
            console.log('Success');
            // res.send({
            //     token: USER_LOGIN_SUCCESS,
            //     roomKey: req.body.roomKey
            //})
        }
    });
});

userRouter.post('/login', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const body = req.body;
    console.log(email)
    console.log(body)
    console.log(password)
    user.findOne({ email: email }, function (err, foundUser) {
        console.log(foundUser);
        if (err) {
            console.log(err)
        } else if (foundUser.password == password) {
            console.log(1)
            res.send({
                token: USER_LOGIN_SUCCESS,
                email: email,
                name: foundUser.firstName
            })
        } else {
            res.send({
                token: USER_LOGIN_FAIL
            })
        }
    })
})