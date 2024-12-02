const { DataTypes } = require('sequelize');
const db = require('../database/config');

const Book = db.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  isbn: {
    type: DataTypes.STRING(13),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  current_price:{
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
});

module.exports   = Book;
