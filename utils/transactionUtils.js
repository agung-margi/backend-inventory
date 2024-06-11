const { Transaction } = require('../models/transactionModel');

//Generate ID Transaction
const generateTransactionId = async () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const transactionId = `${year}${month}${day}${hour}${minute}${seconds}`;

  return transactionId;
}

module.exports = generateTransactionId