const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    password:{
        type: String,
        trim: true,
        required: true,
        minLength: 8
    },
    role:{
        type: String,
        // enum: ['user', 'admin'],
        default: 'user'
    },
    token:{
        type: String,
        required: true
    },
    cart :{
        type: mongoose.Schema.ObjectId,
        ref: 'Cart'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}
// This code defines a Mongoose schema for a User model in a Node.js application.
// The schema includes fields for name, email, password, role, and token.