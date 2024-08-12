const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const CompletedOrder = sequelize.define('CompletedOrder', {
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CompletedOrder;
