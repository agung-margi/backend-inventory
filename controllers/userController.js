const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getAllUser = async (req, res, next) => {
  try {
    const users = await User.findAll();
    users.length === 0
      ? res.status(404).json({

        isSuccess: false,
        message: "User not found",
        data: null
      })
      : res.status(200).json({
        isSuccess: true,
        message: "User retrieved successfully",
        data: users
      });
  } catch (error) {
    next(error);
  }
}

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
        data: null
      });
    }
    res.status(200).json({
      isSuccess: true,
      message: "User retrieved successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const getProfile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
        data: null
      });
    }
    res.status(200).json({
      isSuccess: true,
      message: "User retrieved successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const emailCheck = await User.findOne({ where: { email } });
    if (emailCheck) {
      return res.status(409).json({
        isSuccess: false,
        message: "User already exists",
        data: null
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({
      isSuccess: true,
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
        data: null
      });
    }
    const updatedUser = await user.update({ name, email, password, role });
    res.status(200).json({
      isSuccess: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { id } });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
        data: null
      });
    }
    res.status(200).json({
      isSuccess: true,
      message: "User deleted successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
        data: null
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        isSuccess: false,
        message: "Invalid password",
        data: null
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    if (!user.token) {
      user.token = [];
    }

    user.token = token;
    await user.save();

    res.status(200).json({
      isSuccess: true,
      message: "Login successful",
      data: { user }
    });
  } catch (error) {
    next(error);
  }
}


const logout = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found",
        data: null
      });
    }

    user.token = null;
    await user.save();

    res.status(200).json({
      isSuccess: true,
      message: "Logout successful",
      data: null
    });
  } catch (error) {
    next(error);
  }
}



module.exports = { getAllUser, createUser, updateUser, deleteUser, login, logout, getUserById, getProfile };