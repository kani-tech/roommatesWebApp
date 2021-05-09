const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const tdlModel = require('../models/tdl.js')

const registerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    roomKey: {
        type: String,
    },
    rooms: [String],
    landlord: Boolean,
    rentPaid: Boolean,
    rentCollected: Boolean,
    rent: Number,

})

const user = mongoose.model('User', registerSchema);


module.exports = user;