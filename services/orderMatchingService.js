const PendingOrder = require('../models/PendingOrder');
const CompletedOrder = require('../models/CompletedOrder');
const sequelize = require('../models/index');

async function matchOrders(newOrder) {
  const transaction = await sequelize.transaction();

  try {
    const matchingOrders = await PendingOrder.findAll({
      where: {
        type: newOrder.type === 'buy' ? 'sell' : 'buy',
        price: newOrder.type === 'buy' ? { lte: newOrder.price } : { gte: newOrder.price },
      },
      order: [['price', newOrder.type === 'buy' ? 'ASC' : 'DESC']],
      transaction,
    });

    let remainingQuantity = newOrder.quantity;

    for (const order of matchingOrders) {
      if (remainingQuantity <= 0) break;

      const tradeQuantity = Math.min(order.quantity, remainingQuantity);
      remainingQuantity -= tradeQuantity;

      // Update the matched order
      order.quantity -= tradeQuantity;
      await order.save({ transaction });

      // Save completed order
      await CompletedOrder.create({
        type: newOrder.type,
        price: order.price,
        quantity: tradeQuantity,
      }, { transaction });

      if (order.quantity === 0) {
        await order.destroy({ transaction });
      }
    }

    if (remainingQuantity > 0) {
      await PendingOrder.create({
        type: newOrder.type,
        price: newOrder.price,
        quantity: remainingQuantity,
      }, { transaction });
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = { matchOrders };
