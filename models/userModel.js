const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const tdlModel = require('../models/tdl.js')


const roomSchema = new Schema({
    key: String,
    rent: Number,
    address: String
})
const registerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    roomKey: {
        type: String,
    },
    rooms: [roomSchema],
    landlord: Boolean,
    rentPaid: Boolean,
    rentCollected: Boolean,
    rent: Number,

})

const user = mongoose.model('User', registerSchema);


module.exports = user;