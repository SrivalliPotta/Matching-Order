const { matchOrders } = require('../services/orderMatchingService');

async function placeOrder(req, res) {
  const { type, price, quantity } = req.body;

  try {
    await matchOrders({ type, price, quantity });
    res.status(200).send('Order placed successfully');
  } catch (error) {
    res.status(500).send('Error placing order');
  }
}

module.exports = { placeOrder };
