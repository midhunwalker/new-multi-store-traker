// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  shopOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopOwner', required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
