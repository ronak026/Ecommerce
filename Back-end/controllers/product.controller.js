/* This JavaScript code defines two functions related 
to handling products in a web application: */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Product} = require('../model/Product');
const {User} = require('../model/User');
const { response } = require('express');

// this function retrieves all products from the database
// It verifies the user's token and returns a list of products
const products = async (req, res) => {
    try{
        const products = await Product.find({})

        return res.status(200).json({
            message: 'Products fetched successfully',
            products:products
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error in fetching products',
        });
    }
}

// this function adds a new product to the database
// It extracts product details from the request body, verifies the user's token, and creates a new
const addProduct = async (req,res) =>{
    try{
        let {name,description,price,image,brand,stock} = req.body;
        let {token} = req.headers;
        let decodedToken = jwt.verify(token, 'supersecret')
        let user = await User.findOne({email: decodedToken.email})
        const product = await Product.create({
            name,
            description,
            price,
            image,
            brand,
            stock,
            user: user._id
        })
        res.status(200).json({
                message: 'Product added successfully',
                product: product
            });
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Error in adding product',
        });
    }
}

// this function retrieves a single product based on the provided ID
// It verifies the user's token, checks if the user exists, and then fetches the product
const singleProduct = async (req, res) => {
    try{
        let {id} = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Product ID is required',
            });
        }
        let {token} = req.headers;
        const decodedToken = jwt.verify(token, 'supersecret')
        const user = await User.findOne({email: decodedToken.email});
        if(user){
            const product = await Product.findById(id)

            if(!product){
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            return res.status(200).json({
            message: 'Product fetched successfully',
            product: product
        });

        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error in fetching products',
        });
    }
}

// this function updates a product based on the provided ID and request body
// It verifies the user's token, checks if the user exists, and then updates the product details
const updateProduct = async (req, res) => {
    try{
        let {id} = req.params;
        let {name, description, price, image, brand, stock} = req.body;
        let {token} = req.headers;

        let decodedToken = jwt.verify(token, 'supersecret')
        let user = await User.findOne({email: decodedToken.email})
        
        if(!user){
            return res.status(401).json({
                message: 'Unauthorized user',
            });
        }

        const productUpdate = await Product.findByIdAndUpdate(
            id,
            { name, description, price, image, brand, stock },
            { new: true }
        );

        if(!productUpdate){ 
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product: productUpdate
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error in updating'
        })
    }
}

// this function deletes a product based on the provided ID
// It verifies the user's token, checks if the user exists, and then deletes the product
const deleteProduct = (req, res) => {
    try{
        let {id} = req.params;
        let {token} = req.headers;

        let decodedToken = jwt.verify(token, 'supersecret')
        let user = User.findOne({email: decodedToken.email})

        if(user){
            Product.findByIdAndDelete(id)
            .then(() => {
                res.status(200).json({
                    message: 'Product deleted successfully'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Error in deleting product'
                });
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error in deleting product'
        })
    }
}

module.exports = {products, addProduct, singleProduct, updateProduct, deleteProduct};