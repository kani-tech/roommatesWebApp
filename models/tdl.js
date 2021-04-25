const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const tdlSchema = new Schema({
    roomKey: {
        type: String,
        required: true
    },
    Item: {
        type: String,
        required: true,
    },
})

const tdlModel = mongoose.model('tdl', tdlSchema);


module.exports = tdlModel;