const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const PendingOrder = sequelize.define('PendingOrder', {
  buyerQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  buyerPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  sellerQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellerPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = PendingOrder;
