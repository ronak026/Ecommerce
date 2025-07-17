const {User} = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/userEmail'); // Adjust path if needed

// Function to register a new user
const signup = async(req,res) => {
    try{
        let {name, email, password} = req.body;

        // Check if all fields are fill
        if(!name || !email || !password){
            res.status(400).json({
                message: 'Please fill all the fields',
            });
        }

        // Check if user already exists
        const ifUserAlreadyExists = await User.findOne({
            email
        })

        // If user already exists, return error
        if(ifUserAlreadyExists){
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = bcrypt.hashSync(password, salt);

        // Generate a token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // jsonwebtoken 
        const token = jwt.sign({email}, "supersecret",{expiresIn:'365d'})

        // Create a new user in database
        const newUser = new User({
            name,
            email,
            password: passwordHashed,
            token,
            verificationToken,
            isVerified: false,
            role:'user'
        })

        await newUser.save();

        // Send email with verification link
        const verificationUrl = `http://yourdomain.com/api/user/verify?token=${verificationToken}`;
        await sendEmail({
          to: newUser.email,
          subject: 'Verify your email',
          html: `<p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`
        });

        res.status(200).json({
            message: 'User created successfully'
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error in signup',
        })
    }
}

const login = async(req,res) => {
    try{
        let {email, password} = req.body;

        // Check if all fields are fill
        if(!email || !password){
            res.status(400).json({
                message: 'Please fill all the fields',
            });
        }

        // Check if user exists
        let user = await User.findOne({
            email
        })

        // If user does not exist, return error
        if(!user){
            return res.status(400).json({
                message: 'User does not exist',
            });
        }

        // Compare password
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        // If password is incorrect, return error
        if(!isPasswordCorrect){
            return res.status(400).json({
                message: 'Incorrect password',
            });
        }

        // jsonwebtoken 
        // const token = jwt.sign({email}, "supersecret",{expiresIn:'365d'})

        res.status(200).json({
            message: 'Login successful',
            id:user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token:user.token
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error in signup',
        })
    }
}

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired verification token.' });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  res.status(200).json({ message: 'Email verified successfully!' });
};


module.exports = {signup, login}