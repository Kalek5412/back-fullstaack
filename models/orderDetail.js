const { DataTypes } = require('sequelize');
const db = require('../database/config');
const Order =require('../models/order')
const Book =require('../models/book')

const OrderDetail = db.define('orderDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'id'
      },
        allowNull: false
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: 'id'
      },
      allowNull: false
    },
    detail_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{
    tableName: 'order_details', 
    timestamps: false 
  });

  OrderDetail.belongsTo(Order, { foreignKey: 'order_id' }); // Relación con Client
  OrderDetail.belongsTo(Book, { foreignKey: 'book_id' }); // Relación con Client

  Book.hasMany(OrderDetail, { foreignKey: 'book_id' });   // Relación con Order
  Order.hasMany(OrderDetail, { foreignKey: 'order_id' });   // Relación con Order

  module.exports   = OrderDetail;