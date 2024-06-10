const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      isSuccess: false,
      message: 'Forbidden',
      data: null
    })
  }
  next()
}

const checkProfileOwnership = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({
      isSuccess: false,
      message: 'Forbidden',
      data: null
    })
  }
  next()
}


module.exports = { isAdmin, checkProfileOwnership };