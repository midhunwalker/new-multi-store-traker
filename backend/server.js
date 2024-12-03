// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');
const ShopOwner = require('./models/ShopOwner');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'  // React development server URL
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/multi-store-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Test route
app.get('/', (req, res) => res.send('Hello from backend!'));

// User sign-up
app.post('/api/users/signup', async (req, res) => {
  try {
    const { username, password, rationCardNumber, address } = req.body;
    const newUser = new User({ username, password, rationCardNumber, address });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Shop owner sign-up
app.post('/api/shopowners/signup', async (req, res) => {
  try {
    const { shopName, shopOwnerName, shopOwnerId, password, location } = req.body;
    const newShopOwner = new ShopOwner({ shopName, shopOwnerName, shopOwnerId, password, location });
    await newShopOwner.save();
    res.status(201).json(newShopOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add product
app.post('/api/products/add', async (req, res) => {
  try {
    const { name, price, shopOwnerId, location } = req.body;
    const newProduct = new Product({ name, price, shopOwnerId, location });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get products by location
app.get('/api/products', async (req, res) => {
  try {
    const { location } = req.query;
    const products = await Product.find({ location });
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get products by shopOwnerId
app.get('/api/products/:shopOwnerId', async (req, res) => {
  try {
    const { shopOwnerId } = req.params;
    const products = await Product.find({ shopOwnerId });
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
