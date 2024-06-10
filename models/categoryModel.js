const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Category = db.define('categories', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true });

module.exports = Category;