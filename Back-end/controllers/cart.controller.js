const { Cart } = require("../model/Cart");
const { User } = require("../model/User");
const { Product } = require("../model/Product");
const jwt = require("jsonwebtoken");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const stripe = require("stripe")("sk_test_51Re6uf0776rAQbQy0cUiA63RSoQ9fy4RRT1EQTuFbzmBKx8gORwbaPQ4UdwIlQ6FrJGRRr3pPIIDBFCyPjtdeccB00IgT4Uucc")
const { sendEmail } = require("../utils/userEmail");

const cart = async (req, res) => {
    try {
        const { token } = req.headers;
        const decodedToken = jwt.verify(token, "supersecret");
        const user = await User.findOne({ email: decodedToken.email }).populate({
            path: "cart",
            populate: {
                path: "products.product",
                model: "Product",
            },
        });
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "Cart fetched successfully",
            cart: user.cart,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error in fetching cart",
        });
    }
};

const addToCart = async (req, res) => {
    try {
        const { quantity, productId } = req.body;
        if (!quantity || !productId) {
            return res.status(400).json({
                message: "Some Fields are missing",
            });
        }
        const { token } = req.headers;
        let decodedToken = jwt.verify(token, "supersecret");
        let user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        let cart;
        if (user.cart) {
            cart = await Cart.findById(user.cart);
            if (!cart) {
                cart = await Cart.create({
                    products: [{ product: productId, quantity }],
                    total: product.price * quantity,
                });
                user.cart = cart._id;
                await user.save();
            } else {
                const exists = cart.products.some(
                    (p) => p.product.toString() === productId.toString()
                );
                if (exists) {
                    return res.status(409).json({
                        message: "Go to Cart",
                    });
                }
                cart.products.push({ product: productId, quantity });
                cart.total += product.price * quantity;
                await cart.save();
            }
        } else {
            cart = await Cart.create({
                products: [{ product: productId, quantity }],
                total: product.price * quantity,
            });
            user.cart = cart._id;
            await user.save();
        }

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error in adding product to cart",
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const { productId, action } = req.body;
        const { token } = req.headers;
        const decodedToken = jwt.verify(token, "supersecret");
        const user = await User.findOne({ email: decodedToken.email })
            .populate("cart")
            .populate({
                path: "cart",
                populate: {
                    path: "products.product",
                    model: "Product",
                },
            });
        if (!user || !user.cart) {
            return res.status(404).json({
                message: "User or cart not found",
            });
        }
        const cart = user.cart;
        const item = cart.products.find(
            (p) => p.product._id.toString() === productId
        );
        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart",
            });
        }
        const totalPrice = item.product.price * item.quantity;

        if (action === "increase") {
            item.quantity += 1;
            cart.total += totalPrice;
        } else if (action === "decrease") {
            if (item.quantity > 1) {
                item.quantity -= 1;
                cart.total -= totalPrice;
            } else {
                cart.total -= totalPrice;
                cart.products = cart.products.filter(
                    (p) => p.product._id.toString() !== productId
                );
            }
        } else if (action === "remove") {
            cart.total -= totalPrice * item.quantity;
            cart.products = cart.products.filter(
                (p) => p.product._id.toString() !== productId
            );
        } else {
            return res.status(400).json({
                message: "Invalid action",
            });
        }
        await cart.save();
        return res.status(200).json({
            message: "Cart updated successfully",
            cart,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error in updating cart",
        });
    }
};

const payment = async (req, res) => {
    // console.log("Payment route hit");
    try {
        const { token } = req.headers;
        const decodedToken = jwt.verify(token, "supersecret");
        const user = await User.findOne({ email: decodedToken.email }).populate({
            path: "cart",
            populate: {
                path: "products.product",
                model: "Product",
            },
        });
        if (!user || !user.cart || user.cart.products.length === 0) {
            return res.status(404).json({
                message: "User or cart not found",
            });
        }
        const lineItems = user.cart.products.map((item) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.product.name,
                    },
                    unit_amount: item.product.price * 100, // Stripe expects amount in cents
                },
                quantity: item.quantity,
            };
        });
        const currentUrl = process.env.CLIENT_URL;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${currentUrl}/success`,
            cancel_url: `${currentUrl}/cancel`,
        });
        
        // Send email to user after successful payment
        await sendEmail(
            user.email, 
            user.cart.products.map((item) => ({
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            }))
        );

        // Clear the cart after successful payment        

        user.cart.products = [];
        user.cart.total = 0;
        await user.cart.save();
        await user.save();
        res.status(200).json({
            message: "Get The Payment Url",
            url: session.url,
            // sessionId: session.id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error in processing payment",
        });
    }
};

module.exports = { cart, addToCart, updateCart, payment };
