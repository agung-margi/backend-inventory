const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    const token = authorization && authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        data: null
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        data: null
      })
    }

    const users = await User.findOne({ where: { id: decoded.id } });

    if (users.token !== token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        data: null
      });
    }

    if (!users) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        data: null
      })
    }

    req.user = users
    req.token = token
    next()

  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      return res.status(401).json({
        isSuccess: false,
        message: 'Invalid token',
        data: null
      });
    }
    next(err)
  }
};


module.exports = authMiddleware;