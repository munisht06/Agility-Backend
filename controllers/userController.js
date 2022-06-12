const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//Generate token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc Autheinticate user
// @route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const newUser = await User.create({ name, email, password: hashedPassword });

  if (newUser) {
    res.status(201).json({
      success: true,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

// @desc Login user
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Incorrect password");
  }

  res.status(200).json({
    success: true,
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user),
  });
});

// @desc Get users
// @route GET /api/user/all
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc Get a user
// @route GET /api/user/
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// @desc Update user
// @route PUT /api/user/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

// @desc Delete user
// @route DELETE /api/user/
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.remove();
  res
    .status(200)
    .json({ success: true, message: "User deleted", id: req.user._id });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
