const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

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

const getDetailsTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ where: { id } });
    if (!transaction) {
      return res.status(404).json({
        isSuccess: false,
        message: "Transaction not found",
        data: null
      });
    } else {
      return res.status(200).json({
        isSuccess: true,
        message: "Transaction retrieved successfully",
        data: transaction
      });
    }
  } catch (error) {
    next(error);
  }
}

const createTransaction = async (req, res, next) => {
  try {
    const { userId, productId, quantity, type } = req.body;
    const product = await Product.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({
        isSuccess: false,
        message: "Product not found",
        data: null
      });
    }

    if (type === "in") {
      product.stock += quantity;
    } else if (type === "out") {
      if (product.stock < quantity) {
        return res.status(400).json({
          isSuccess: false,
          message: "Insufficient stock",
          data: null
        });
      }
      product.stock -= quantity;
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid transaction type",
        data: null
      });
    }

    await product.save();

    const transaction = await Transaction.create({ userId, productId, quantity, type });
    return res.status(201).json({
      isSuccess: true,
      message: "Transaction created successfully",
      data: transaction
    });
  } catch (error) {
    next(error);
  }
}

const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productId, quantity, type } = req.body;
    const transaction = await Transaction.findOne({ where: { id } });

    if (!transaction) {
      return res.status(404).json({
        isSuccess: false,
        message: "Transaction not found",
        data: null
      });
    }

    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({
        isSuccess: false,
        message: "Product not found",
        data: null
      });
    }

    if (type === "in") {
      product.stock -= transaction.quantity;
      product.stock += quantity;
    } else if (type === "out") {
      if (product.stock < quantity) {
        return res.status(400).json({
          isSuccess: false,
          message: "Insufficient stock",
          data: null
        });
      }
      product.stock += transaction.quantity;
      product.stock -= quantity;
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid transaction type",
        data: null
      });
    }

    await product.save();

    transaction.productId = productId;
    transaction.quantity = quantity;
    transaction.type = type;
    await transaction.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Transaction updated successfully",
      data: transaction
    });
  } catch (error) {
    next(error);
  }
}



const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ where: { id } });

    if (!transaction) {
      return res.status(404).json({
        isSuccess: false,
        message: "Transaction not found",
        data: null
      });
    }

    // Temukan produk yang terkait dengan transaksi
    const product = await Product.findOne({ where: { id: transaction.productId } });
    if (!product) {
      return res.status(404).json({
        isSuccess: false,
        message: "Product not found",
        data: null
      });
    }

    // Kembalikan stok produk ke nilai sebelum transaksi
    if (transaction.type === "in") {
      product.stock -= transaction.quantity;
    } else if (transaction.type === "out") {
      product.stock += transaction.quantity;
    }

    await product.save();

    await transaction.destroy();

    return res.status(200).json({
      isSuccess: true,
      message: "Transaction deleted successfully",
      data: null
    });
  } catch (error) {
    next(error);
  }
}


module.exports = { getAllTransaction, getDetailsTransaction, createTransaction, updateTransaction, deleteTransaction }