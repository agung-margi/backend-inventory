const Transaction = require('../models/transactionModel');

const getAllTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();

    if (transactions.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Transaction not found',
        data: null
      });
    } else {
      return res.status(200).json({
        isSuccess: true,
        message: 'Transaction retrieved successfully',
        data: transactions
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllTransaction }