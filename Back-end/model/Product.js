const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        trim: true,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product};