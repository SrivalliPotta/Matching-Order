const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Order = sequelize.define('Order', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Order;
