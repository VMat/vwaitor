var mongoose = require('mongoose');

// Mongoose productSchema definition
productSchema = new mongoose.Schema({
  uniqueCode: Number,
  categories: [{
    uniqueCode: Number,
    name: String
  }],
  name: String,
  img: [String],
  description: String,
  priceSince: Number,
  variations: [{
    variationId: Number,
    variationName: String,
    variationImg: [String],
    variationDescription: String,
    price: Number
  }]
});

Products = mongoose.model('admin', productSchema, 'Products');

return Products;
