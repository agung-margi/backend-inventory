const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Category = require('./categoryModel');

const Product = db.define('products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.UUID, 
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: true });

module.exports = Product;