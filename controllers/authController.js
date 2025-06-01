// const crypto = require('crypto');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const ResetToken = require('../models/ResetToken');
// const sendEmail = require('../utils/sendEmail');

// // @desc    Register user
// // @route   POST /api/auth/register
// // @access  Public
// exports.register = async (req, res, next) => {
//   const { name, phone, email, password } = req.body;

//   try {
//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ 
//         success: false,
//         error: 'User already exists with this email'
//       });
//     }

//     // Create user
//     const user = await User.create({
//       name,
//       phone,
//       email,
//       password
//     });

//     // Create token
//     const token = user.getSignedJwtToken();

//     res.status(201).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ 
//       success: false,
//       error: 'Server error' 
//     });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// exports.login = async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     // Validate email & password
//     if (!email || !password) {
//       return res.status(400).json({ 
//         success: false,
//         error: 'Please provide an email and password' 
//       });
//     }

//     // Check for user
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return res.status(401).json({ 
//         success: false,
//         error: 'Invalid credentials' 
//       });
//     }

//     // Check if password matches
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ 
//         success: false,
//         error: 'Invalid credentials' 
//       });
//     }

//     // Create token
//     const token = user.getSignedJwtToken();

//     res.status(200).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ 
//       success: false,
//       error: 'Server error' 
//     });
//   }
// };

// // @desc    Forgot password
// // @route   POST /api/auth/forgotpassword
// // @access  Public
// exports.forgotPassword = async (req, res, next) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: 'No user found with this email'
//       });
//     }

//     // Get reset token
//     const resetToken = user.getResetPasswordToken();
//     await user.save({ validateBeforeSave: false });

//     // Create reset URL
//     const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

//     const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

//     try {
//       await sendEmail({
//         email: user.email,
//         subject: 'Password reset token',
//         message
//       });

//       res.status(200).json({ 
//         success: true, 
//         data: 'Email sent' 
//       });
//     } catch (err) {
//       console.error(err);
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;
//       await user.save({ validateBeforeSave: false });

//       return res.status(500).json({ 
//         success: false,
//         error: 'Email could not be sent' 
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ 
//       success: false,
//       error: 'Server error' 
//     });
//   }
// };

// // @desc    Reset password
// // @route   PUT /api/auth/resetpassword/:resettoken
// // @access  Public
// exports.resetPassword = async (req, res, next) => {
//   // Get hashed token
//   const resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(req.params.resettoken)
//     .digest('hex');

//   try {
//     const user = await User.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ 
//         success: false,
//         error: 'Invalid or expired token' 
//       });
//     }

//     // Set new password
//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     // Create token
//     const token = user.getSignedJwtToken();

//     res.status(200).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ 
//       success: false,
//       error: 'Server error' 
//     });
//   }
// };

// // Add this method to the User model
// userSchema.methods.getSignedJwtToken = function() {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE
//   });
// };