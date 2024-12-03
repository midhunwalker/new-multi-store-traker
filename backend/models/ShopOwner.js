// backend/models/ShopOwner.js
const mongoose = require('mongoose');

const shopOwnerSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  shopOwnerName: { type: String, required: true },
  shopOwnerId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model('ShopOwner', shopOwnerSchema);
