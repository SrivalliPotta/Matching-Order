const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
const PendingOrder = require('./models/PendingOrder');
const CompletedOrder = require('./models/CompletedOrder');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/pending-orders', async (req, res) => {
    const orders = await PendingOrder.findAll();
    res.json(orders);
});

app.get('/completed-orders', async (req, res) => {
    const orders = await CompletedOrder.findAll();
    res.json(orders);
});

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running...');
});
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.log(err));
