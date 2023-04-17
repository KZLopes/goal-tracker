const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  registerUser: asyncHandler(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please Add All Fields');
      }
      const userExists = await User.findOne({ email: email });

      if (userExists) {
        res.status(400);
        throw new Error('email already registered');
      }

      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error('Invalid User Data');
      }
    } catch (err) {
      return next(err);
    }
  }),

  loginUser: asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error('Credenciais Invalidas');
      }
    } catch (err) {
      return next(err);
    }
  }),

  getUser: asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
      id: _id,
      name: name,
      email: email,
    });
  }),
};
