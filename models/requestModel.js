const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    roomKey: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    request: {
        type: String,
        required: true,
    }
})

const requestModel = mongoose.model('request', requestSchema);
module.exports = requestModel;