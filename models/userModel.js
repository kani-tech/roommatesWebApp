const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    // room ?
})

const user = mongoose.model('User', registerSchema);


module.exports = user;
