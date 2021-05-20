const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/api.js');
require('dotenv').config();

// HTTP request logger
app.use(morgan('tiny'));

let connect = process.env.MONGODB_URL || 'mongodb://localhost:27017/propManage';

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('DB connected');
});

const port = process.env.PORT || 5000;

// Parse
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Provide permission for server
app.use(cors());
app.use('/api', userRouter);
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started on port ${port}`);
  }
});
