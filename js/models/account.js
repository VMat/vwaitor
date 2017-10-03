var mongoose = require('mongoose');

accountSchema = new mongoose.Schema({ 
  uniqueCode: Number,
  tableUniqueCodes: [Number],
  requests: [{
      uniqueCode: Number,
      person: {
          personUniqueCode: Number,
          name: String,
          documentNumber: Number
      },
      products: [{
          productUniqueCode: Number,
          name: String,
          price: Number,
          img: [String],
          amount: Number
      }],
      total: Number
  }],
  total: Number,
  open: String,
  paymentMethod: String
});

Account = mongoose.model('admin2', accountSchema, 'Accounts');

module.exports = Account;
