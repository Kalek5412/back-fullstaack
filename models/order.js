
const { DataTypes } = require('sequelize');
const db = require('../database/config');
const Client =require('../models/client')

const Order = db.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id'
      },
      allowNull: false
    },
    doc_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    doc_number: {
      type: DataTypes.STRING(20)
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  },{
    tableName: 'orders', 
    timestamps: false    
  });
 
  Order.belongsTo(Client, { foreignKey: 'client_id' }); // Relación con Client
  Client.hasMany(Order, { foreignKey: 'client_id' });   // Relación con Order

  module.exports   = Order;