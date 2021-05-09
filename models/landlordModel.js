const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const landlordSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    rooms: [String],
    landlord: Boolean,

})

const landlord = mongoose.model('landlord', landlordSchema);


module.exports = landlord;