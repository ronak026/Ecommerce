const express = require('express')
const app = express();
const port = 8080;
const connectDB = require('./DB/connectDB');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index');
const nodemailer = require('nodemailer');
require('dotenv').config();
// database
connectDB();

// middleware
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// routes
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})