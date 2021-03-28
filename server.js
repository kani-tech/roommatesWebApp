const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/api.js')

// HTTP request logger
app.use(morgan('tiny'));

mongoose.connect('mongodb://localhost:27017/propManage', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () => {
    console.log("DB connected")
})


const PORT = process.env.PORT || 4000

// Parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Provide permission for server
app.use(cors())
app.use('/api', userRouter)

app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`server started on port ${PORT}`)
    }
})
