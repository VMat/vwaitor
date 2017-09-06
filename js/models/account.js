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
            price: Number
        }],
        total: Number
    }],

    total: Number,
    open: Boolean,
    paymentMethod: String
});

Account = mongoose.model('admin2', accountSchema, 'Accounts');

export module Account;
