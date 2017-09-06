var mongoose = require('mongoose');

requestSchema = new mongoose.Schema({
  uniqueCode: Number,
  person: {
      personUniqueCode: Number,
      name: String,
      documentNumber: Number
  },
  products: [{
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
      price: Number, 
      amount: Number
    }], 
    amount: Number
  }],
  total: Number
});

export module requestSchema;

