const errorHandler = (err, req, res, next) => {

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ isSuccess: false, message: 'Bad request', error: err.message });
  }

  console.error(err.stack);
  res.status(500).json({ isSuccess: false, message: 'Internal server error', error: err.message });
};

module.exports = errorHandler;
