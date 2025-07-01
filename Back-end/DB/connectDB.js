const mongoose = require('mongoose')

function connectDB() {

    // mongoose.connect('mongodb://127.0.0.1:27017/MCA')
    mongoose.connect(process.env.mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
}

module.exports = connectDB;