const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const choreSchema = new Schema({
    roomKey: {
        type: String,
        required: true
    },
    Item: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Checked: {
        type: Boolean,
        required: true,
    },
})

const choreModel = mongoose.model('chore', choreSchema);


module.exports = choreModel;