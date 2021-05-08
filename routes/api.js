const express = require('express')

const userRouter = express.Router()

const user = require('../models/userModel.js')
const tdlModel = require('../models/tdl.js')
const requestModel = require('../models/requestModel.js')
const choreModel = require('../models/chores.js')
const nodemailer = require("nodemailer")
const stripe = require("stripe")("sk_test_51IlJLyHixsK8VUAYxdjHLuclpi1Cb6aMxYDk5LVqmmiUbuS1V4YX4FDW1P1iX7WljWEiMP0yfzQUoJzlEse83ota007X9hFBi5");
const uuid = require("uuid");

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
            return;
        } else {
            res.send({
                token: USER_LOGIN_SUCCESS
            })
            const newUser = new user({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.Email,
                password: req.body.Password,
                landlord: req.body.Landlord
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

userRouter.post('/login', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const body = req.body;
    console.log(email)
    console.log(body)
    console.log(password)
    user.findOne({ email: email }, await function (err, foundUser) {
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

userRouter.post('/chore', async function (req, res) {
    const roomkey = req.body.roomKey;
    let existName = await user.findOne({ firstName: req.body.name });
    let existsChore = await choreModel.findOne({ Item: req.body.item });
    console.log(existName);
    if (existName && !existsChore) {
        const newItem = new choreModel({
            Item: req.body.item,
            Name: req.body.name,
            roomKey: roomkey,
            Checked: false,
        });
        newItem.save();
        res.send({
            token: USER_LOGIN_SUCCESS
        });
    } else if (!existName) {
        res.send({
            token: USER_LOGIN_FAIL
        })
        return;
    } else {
        res.send({
            token: 5318008
        })
        return;
    }
})

userRouter.post('/choreCheck', async function (req, res) {
    console.log(req.body);
    let update = await choreModel.findOneAndUpdate({ Item: req.body.Item }, { Checked: !(req.body.Checked) });
    console.log(update);
    update = await choreModel.findOne({ Item: req.body.Item });
    console.log(update);
    res.send({
        token: USER_LOGIN_SUCCESS,
    });
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

    addRequest.save();

    async function sendMail() {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'propmanageApp@gmail.com',
                pass: 'ontheMoon2023'
            }
        })


        await transporter.sendMail({
            from: '"roomates.com" <kanishksk@gmail.com>',
            to: "jgreymon@gmail.com", // replace with landlord email
            subject: "New Request",
            text: `In room ${roomkey} there has been a new request:
                ${title}
                ${request}`
        })
    }
    sendMail().catch(console.error)
})

userRouter.post('/getcomplaints', async function (req, res) {
    const roomkey = req.body.roomkey
    console.log("roomkey", roomkey)
    console.log(req.body)
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
    //console.log(roomkey);
    choreModel.find({ roomKey: roomkey }, await function (err, foundMates) {
        //console.log(foundMates)
        if (err) {
            res.send({
                token: USER_LOGIN_FAIL
            })
        } else {
            //console.log(foundMates);
            res.send({
                token: USER_LOGIN_SUCCESS,
                items: foundMates,
            })
        }
    })
})


userRouter.post('/updateChores', async function (req, res) {
    console.log(req.body.roomies);
    console.log(req.body.chores);
    const numChores = await choreModel.countDocuments({});
    console.log("length", req.body.roomies.length);
    console.log("numChores", numChores);
    for (let i = 0; i < numChores; ++i) {
        console.log(i);
        console.log(req.body.chores[i].Item);
        console.log(req.body.roomies[i % req.body.roomies.length])


        let update = await choreModel.findOneAndUpdate({ Item: req.body.chores[i].Item }, { Name: req.body.roomies[i % req.body.roomies.length] });
        console.log(update);
    }
    // let update = await choreModel.findOneAndUpdate({ Item: req.body.Item }, { Checked: !(req.body.Checked) });
    // console.log(update);
    // update = await choreModel.findOne({ Item: req.body.Item });
    // console.log(update);
    res.send({
        token: USER_LOGIN_SUCCESS,
    });
})


userRouter.post('/checkout', async function (req, res) {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { product, token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        // const idempotency_key = uuid();
        const charge = await stripe.charges.create(
            {
                amount: product * 100,
                currency: "cad",
                customer: customer.id,
                receipt_email: token.email,
                description: `Rent paid!`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },

        );
        console.log("Charge:", { charge });
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({ error, status });
});


