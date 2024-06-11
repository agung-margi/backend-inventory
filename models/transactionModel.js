const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./userModel');
const Product = require('./productModel');
const generateTransactionId = require('../utils/transactionUtils')

const Transaction = db.define('transactions', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: generateTransactionId,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: true });


Transaction.belongsTo(Product, { foreignKey: 'productId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });


module.exports = Transaction