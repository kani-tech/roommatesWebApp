const express = require('express')

const userRouter = express.Router()

const user = require('../models/userModel.js')
const tdlModel = require('../models/tdl.js')
const requestModel = require('../models/requestModel.js')
const choreModel = require('../models/chores.js')

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
            res.send({
                token: USER_LOGIN_FAIL
            })
        } else {
            console.log('Success');
            res.send({
                token: USER_LOGIN_SUCCESS,
                roomKey: req.body.roomKey
            })
        }
    });
});


userRouter.post('/dashboard', async function (req, res) {
    console.log(req.body)
    const sendKey = req.body.roomKey

    user.find({ roomKey: sendKey }, await function (err, foundMates) {
        console.log(foundMates)
        if (err) {
            res.send({
                token: USER_LOGIN_FAIL
            })
        } else {
            console.log(foundMates);
            res.send({
                token: USER_LOGIN_SUCCESS,
                roommates: foundMates,
            })
        }
    })
})

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
                name: foundUser.firstName,
                roomKey: foundUser.roomKey
            })
        } else {
            res.send({
                token: USER_LOGIN_FAIL
            })
        }
    })
})

userRouter.post('/toDo', function (req, res) {
    const roomkey = req.body.roomKey;
    const newItem = new tdlModel({
        Item: req.body.item,
        roomKey: roomkey
    });
    newItem.save()
})

userRouter.post('/toDoDisplay', async function (req, res) {
    const roomkey = req.body.roomkey;
    console.log(roomkey)
    tdlModel.find({ roomKey: roomkey }, await function (err, foundMates) {
        console.log(foundMates)
        if (err) {
            res.send({
                token: USER_LOGIN_FAIL
            })
        } else {
            console.log(foundMates);
            res.send({
                token: USER_LOGIN_SUCCESS,
                items: foundMates,
            })
        }
    })
})

userRouter.post('/toDoDelete', async function (req, res) {
    const id = req.body.itemID;
    tdlModel.findByIdAndRemove(id, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log('removed', docs)
        }
    })
})

userRouter.post('/addrequest', async function (req, res) {
    const roomkey = req.body.roomkey
    const title = req.body.title;
    const request = req.body.request;

    const addRequest = new requestModel({
        roomKey: roomkey,
        title: title,
        request: request,
    });

    addRequest.save()
})

userRouter.post('/getcomplaints', async function (req, res) {
    const roomkey = req.body.roomkey
    console.log("roomkey", roomkey)
    requestModel.find({ roomKey: roomkey }, await function (err, foundRequests) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundRequests)
            res.send({
                token: USER_LOGIN_SUCCESS,
                requests: foundRequests
            })
        }
    })
})

userRouter.post('/choresDisplay', async function (req, res) {
    const roomkey = req.body.roomkey;
    console.log(roomkey);
    choreModel.find({ roomKey: roomkey }, await function (err, foundMates) {
        console.log(foundMates)
        if (err) {
            res.send({
                token: USER_LOGIN_FAIL
            })
        } else {
            console.log(foundMates);
            res.send({
                token: USER_LOGIN_SUCCESS,
                items: foundMates,
            })
        }
    })
})

userRouter.post('/chore', function (req, res) {
    const roomkey = req.body.roomKey;
    const newItem = new choreModel({
        Item: req.body.item,
        Name: req.body.name,
        roomKey: roomkey
    });
    newItem.save()
})