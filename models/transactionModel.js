const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./userModel');
const Product = require('./productModel');

const Transaction = db.define('transactions', {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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

const getLastTransaction = async () => {
  try {
    const lastTransaction = await Transaction.findOne({
      order: [['createdAt', 'DESC']],
    });
    if (lastTransaction) {
      const lastTransactionId = parseInt(lastTransaction.transactionNumber);
      return lastTransactionId + 1;

    } else {
      return 1;
    }
  } catch (err) {
    throw new Error('Failed to retrieve transaction sequence number from the database');
  }
}
//Generate ID Transaction
const generateTransactionId = async () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const transactionNumber = await getLastTransaction();

  return `${year}${month}${day}${hour}${minute}${seconds}${transactionNumber}`;
}

module.exports = Transaction